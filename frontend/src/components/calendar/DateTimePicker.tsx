"use client";

import { useState, useEffect } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface DateTimePickerProps {
  selectedDateTime: Date | null;
  onDateTimeChange: (date: Date) => void;
}

const DateTimePicker = ({
  selectedDateTime,
  onDateTimeChange,
}: DateTimePickerProps) => {
  const initialDate = selectedDateTime || new Date();
  const [month, setMonth] = useState<number>(initialDate.getMonth());
  const [day, setDay] = useState<number>(initialDate.getDate());
  const [time, setTime] = useState<string>("9:00 AM");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (month: number) => {
    return new Date(new Date().getFullYear(), month + 1, 0).getDate();
  };

  const generateTimeSlots = () => {
    const slots = [];
    // Generate times from 9 AM to 9 PM
    for (let hour = 9; hour <= 21; hour++) {
      const period = hour >= 12 ? "PM" : "AM";
      const hour12 = hour > 12 ? hour - 12 : hour;
      for (let minute = 0; minute < 60; minute += 15) {
        slots.push(`${hour12}:${minute.toString().padStart(2, "0")} ${period}`);
      }
    }
    return slots;
  };

  useEffect(() => {
    const [timeStr, period] = time.split(" ");
    const [hours, minutes] = timeStr.split(":").map(Number);
    let hours24 = hours;

    if (period === "PM" && hours !== 12) hours24 += 12;
    if (period === "AM" && hours === 12) hours24 = 0;

    const newDate = new Date();
    newDate.setFullYear(new Date().getFullYear());
    newDate.setMonth(month);
    newDate.setDate(day);
    newDate.setHours(hours24, minutes, 0, 0);

    onDateTimeChange(newDate);
  }, [month, day, time]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: { xs: "column", sm: "row" },
        "& .MuiFormControl-root": {
          width: { xs: "100%", sm: "auto" },
          minWidth: { sm: 80 },
        },
        "& .MuiSelect-select": {
          fontSize: { xs: "0.9rem", sm: "1rem" },
        },
      }}
    >
      <FormControl size="small">
        <InputLabel id="month-label">Month</InputLabel>
        <Select
          labelId="month-label"
          value={month}
          label="Month"
          onChange={(e) => setMonth(Number(e.target.value))}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
              },
            },
          }}
        >
          {months.map((monthName, index) => (
            <MenuItem key={monthName} value={index}>
              {monthName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small">
        <InputLabel id="day-label">Day</InputLabel>
        <Select
          labelId="day-label"
          value={day}
          label="Day"
          onChange={(e) => setDay(Number(e.target.value))}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
              },
            },
          }}
        >
          {Array.from({ length: getDaysInMonth(month) }, (_, i) => i + 1).map(
            (d) => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>

      <FormControl size="small">
        <InputLabel id="time-label">Time</InputLabel>
        <Select
          labelId="time-label"
          value={time}
          label="Time"
          onChange={(e) => setTime(e.target.value)}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
              },
            },
          }}
        >
          {generateTimeSlots().map((timeSlot) => (
            <MenuItem key={timeSlot} value={timeSlot}>
              {timeSlot}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DateTimePicker;
