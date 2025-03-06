"use client";

import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Alert,
} from "@mui/material";
import { useTutorAvailability } from "@/context/tutorAvailability/tutorAvailabilityContext";
import DateTimePicker from "./DateTimePicker";

interface AddAvailabilitySlotProps {
  selectedDate: Date;
  subjects: string[];
  onSuccess?: () => void;
}

const AddAvailabilitySlot = ({
  selectedDate,
  subjects,
  onSuccess,
}: AddAvailabilitySlotProps) => {
  const { addAvailability, loading, error } = useTutorAvailability();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!selectedSubject || !startTime || !endTime) {
      setFormError("Please fill in all fields");
      return;
    }

    // Add more validation
    const now = new Date();
    if (startTime < now) {
      setFormError("Start time cannot be in the past");
      return;
    }

    if (endTime <= startTime) {
      setFormError("End time must be after start time");
      return;
    }

    // Ensure minimum session length (e.g., 30 minutes)
    const thirtyMinutes = 30 * 60 * 1000;
    if (endTime.getTime() - startTime.getTime() < thirtyMinutes) {
      setFormError("Session must be at least 30 minutes long");
      return;
    }

    try {
      const localStartTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        startTime.getHours(),
        startTime.getMinutes()
      );

      const localEndTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        endTime.getHours(),
        endTime.getMinutes()
      );

      await addAvailability([
        {
          day: selectedDate.toLocaleDateString("en-CA"),
          subject: selectedSubject,
          startTime: localStartTime.toLocaleString(),
          endTime: localEndTime.toLocaleString(),
          isActive: true,
        },
      ]);

      // Reset form
      setSelectedSubject("");
      setStartTime(null);
      setEndTime(null);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError("Failed to add availability slot");
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Add Availability Slot for{" "}
        {selectedDate.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </Typography>

      {(error || formError) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {formError || error}
        </Alert>
      )}

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Subject</InputLabel>
        <Select
          value={selectedSubject}
          label="Subject"
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          {subjects.map((subject) => (
            <MenuItem key={subject} value={subject}>
              {subject}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Start Time
        </Typography>
        <DateTimePicker
          selectedDateTime={startTime}
          onDateTimeChange={setStartTime}
          selectedDate={selectedDate}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          End Time
        </Typography>
        <DateTimePicker
          selectedDateTime={endTime}
          onDateTimeChange={setEndTime}
          selectedDate={selectedDate}
        />
      </Box>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{
          py: 1.5,
          backgroundColor: "var(--primary-color)",
          "&:hover": { backgroundColor: "var(--button-primary-hover)" },
        }}
      >
        {loading ? "Adding..." : "Add Availability Slot"}
      </Button>
    </Box>
  );
};

export default AddAvailabilitySlot;
