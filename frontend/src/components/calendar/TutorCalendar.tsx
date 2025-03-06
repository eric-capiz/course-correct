"use client";

import { useState } from "react";
import { Box, Typography, Paper, Grid, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { visuallyHidden } from "@mui/utils";

interface TutorCalendarProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null;
}

const TutorCalendar = ({ onDateSelect, selectedDate }: TutorCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get current month details
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const startingDayIndex = firstDayOfMonth.getDay();

  // Generate days array for the current month
  const daysInMonth = lastDayOfMonth.getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Navigation handlers
  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1));
  };

  // Day selection handler
  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    onDateSelect(clickedDate);
  };

  // Get tomorrow's date at midnight for comparison
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Paper elevation={0} sx={{ p: 2 }} role="region" aria-label="Calendar">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <IconButton onClick={handlePreviousMonth} aria-label="Previous month">
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="h6" component="h2" id="current-month">
          {currentDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </Typography>
        <IconButton onClick={handleNextMonth} aria-label="Next month">
          <ChevronRightIcon />
        </IconButton>
      </Box>

      <Grid container spacing={1} role="grid" aria-labelledby="current-month">
        {weekDays.map((day) => (
          <Grid item xs={12 / 7} key={day} role="columnheader">
            <Typography
              align="center"
              sx={{
                fontWeight: 500,
                color: "text.secondary",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              }}
            >
              {day}
            </Typography>
          </Grid>
        ))}

        {Array.from({ length: startingDayIndex }).map((_, index) => (
          <Grid
            item
            xs={12 / 7}
            key={`empty-${index}`}
            role="gridcell"
            aria-hidden="true"
          >
            <Box sx={{ p: 1 }} />
          </Grid>
        ))}

        {days.map((day) => {
          const date = new Date(currentYear, currentMonth, day);
          const isPastOrToday = date < tomorrow;
          const isSelected =
            selectedDate?.toDateString() === date.toDateString();

          return (
            <Grid item xs={12 / 7} key={day} role="gridcell">
              <Box
                onClick={() => !isPastOrToday && handleDayClick(day)}
                onKeyPress={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && !isPastOrToday) {
                    handleDayClick(day);
                  }
                }}
                tabIndex={isPastOrToday ? -1 : 0}
                role="gridcell"
                aria-disabled={isPastOrToday}
                aria-label={`${date.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}${isPastOrToday ? ", not available" : ""}`}
                sx={{
                  p: { xs: 0.5, sm: 1 },
                  borderRadius: 1,
                  cursor: isPastOrToday ? "not-allowed" : "pointer",
                  backgroundColor: isSelected ? "primary.main" : "transparent",
                  color: isPastOrToday
                    ? "text.disabled"
                    : isSelected
                    ? "common.white"
                    : "text.primary",
                  "&:hover": !isPastOrToday && {
                    backgroundColor: isSelected
                      ? "primary.dark"
                      : "action.hover",
                  },
                  "&:focus-visible": !isPastOrToday && {
                    outline: "2px solid",
                    outlineColor: "primary.main",
                    outlineOffset: "2px",
                  },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: { xs: 32, sm: 40 },
                }}
              >
                <Typography sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
                  {day}
                </Typography>
                {isSelected && <Box sx={visuallyHidden}>Selected date</Box>}
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default TutorCalendar;
