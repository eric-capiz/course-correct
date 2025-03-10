import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
  const month = currentDate.toLocaleString("default", { month: "long" });
  const day = currentDate.getDate();

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

    const newDate = new Date(selectedDate);
    let hour = parseInt(hours);

    // Convert to 24-hour format
    if (period === "PM" && hour !== 12) {
      hour += 12;
    } else if (period === "AM" && hour === 12) {
      hour = 0;
    }

    newDate.setHours(hour, parseInt(minutes), 0, 0);
    onDateTimeChange(newDate);
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
          value={month}
          label="Month"
          disabled
          sx={{ minWidth: { xs: "100%", sm: 120 } }}
        >
          <MenuItem value={month}>{month}</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Day</InputLabel>
        <Select
          value={day}
          label="Day"
          disabled
          sx={{ minWidth: { xs: "100%", sm: 80 } }}
        >
          <MenuItem value={day}>{day}</MenuItem>
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
