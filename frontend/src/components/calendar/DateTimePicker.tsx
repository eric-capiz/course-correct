import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface DateTimePickerProps {
  selectedDateTime: Date | null;
  onDateTimeChange: (date: Date | null) => void;
  selectedDate: Date;
}

const DateTimePicker = ({
  selectedDateTime,
  onDateTimeChange,
  selectedDate,
}: DateTimePickerProps) => {
  const currentDate = selectedDate || new Date();
  const monthIndex = currentDate.getMonth();
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const lastDayOfMonth = new Date(year, monthIndex + 1, 0).getDate();
  const daysInMonth = Array.from({ length: lastDayOfMonth }, (_, i) => i + 1);

  const generateTimeSlots = () => {
    const times = [];
    // Start from 6 AM (6) to 10 PM (22)
    for (let hour = 6; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = new Date();
        time.setHours(hour, minute);
        times.push({
          label: time.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
          value: time,
        });
      }
    }
    return times;
  };

  const handleTimeChange = (timeString: string) => {
    const [time, period] = timeString.split(" ");
    const [hours, minutes] = time.split(":");

    const baseDate = new Date(currentDate.getTime());
    let hour = parseInt(hours, 10);

    if (period === "PM" && hour !== 12) {
      hour += 12;
    } else if (period === "AM" && hour === 12) {
      hour = 0;
    }

    baseDate.setHours(hour, parseInt(minutes, 10), 0, 0);
    onDateTimeChange(baseDate);
  };

  const handleMonthChange = (newMonthIndex: number) => {
    if (newMonthIndex < 0 || newMonthIndex > 11 || isNaN(newMonthIndex)) return;
    const lastDay = new Date(year, newMonthIndex + 1, 0).getDate();
    const safeDay = Math.min(day, lastDay);
    const newDate = new Date(
      year,
      newMonthIndex,
      safeDay,
      currentDate.getHours(),
      currentDate.getMinutes(),
      0,
      0
    );
    if (!isNaN(newDate.getTime())) {
      onDateTimeChange(newDate);
    }
  };

  const handleDayChange = (newDay: number) => {
    if (isNaN(newDay) || newDay < 1 || newDay > lastDayOfMonth) return;
    const newDate = new Date(
      year,
      monthIndex,
      newDay,
      currentDate.getHours(),
      currentDate.getMinutes(),
      0,
      0
    );
    if (!isNaN(newDate.getTime())) {
      onDateTimeChange(newDate);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: { xs: "column", sm: "row" },
        "& .MuiFormControl-root": {
          width: { xs: "100%", sm: "auto" },
        },
      }}
    >
      <FormControl>
        <InputLabel>Month</InputLabel>
        <Select
          value={monthIndex}
          label="Month"
          onChange={(e) => handleMonthChange(Number(e.target.value))}
          sx={{ minWidth: { xs: "100%", sm: 120 } }}
        >
          {MONTHS.map((m, i) => (
            <MenuItem key={m} value={i}>{m}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Day</InputLabel>
        <Select
          value={day}
          label="Day"
          onChange={(e) => handleDayChange(Number(e.target.value))}
          sx={{ minWidth: { xs: "100%", sm: 80 } }}
        >
          {daysInMonth.map((d) => (
            <MenuItem key={d} value={d}>{d}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Time</InputLabel>
        <Select
          value={
            selectedDateTime?.toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }) || ""
          }
          label="Time"
          onChange={(e) => handleTimeChange(e.target.value)}
          sx={{
            minWidth: { xs: "100%", sm: 140 },
            "& .MuiSelect-select": {
              py: 1.5,
            },
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
              },
            },
          }}
        >
          {generateTimeSlots().map(({ label }) => (
            <MenuItem key={label} value={label} sx={{ py: 1 }}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DateTimePicker;
