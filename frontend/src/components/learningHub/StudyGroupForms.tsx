"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import { useStudyGroup } from "@/context/studyGroup/studyGroupContext";
import DateTimePicker from "@/components/calendar/DateTimePicker";

const StudyGroupForm = () => {
  const { createStudyGroup, loading, getAllStudyGroups } = useStudyGroup();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    date: "",
    time: "",
    duration: "60",
  });

  const handleDateTimeChange = (date: Date | null) => {
    if (date) {
      setSelectedDateTime(date);
      setFormData({
        ...formData,
        date: date.toISOString().split("T")[0],
        time: date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!formData.title || !formData.subject || !selectedDateTime) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      await createStudyGroup(formData);
      await getAllStudyGroups();
      setSuccess(true);
      setSelectedDateTime(null);
      setFormData({
        title: "",
        description: "",
        subject: "",
        date: "",
        time: "",
        duration: "60",
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create study group"
      );
    }
  };

  return (
    <Card sx={{ mb: 4, maxWidth: 800, mx: "auto" }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Create a Study Group
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Study group created successfully! It will display on your profile
            page.
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Title"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              sx={{ mb: 2 }}
              placeholder="e.g., Calculus Study Session"
            />

            <TextField
              fullWidth
              label="Subject"
              required
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              sx={{ mb: 2 }}
              placeholder="e.g., Calculus, Physics, Literature"
            />

            <TextField
              fullWidth
              label="Description"
              multiline
              rows={2}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              sx={{ mb: 2 }}
              placeholder="Describe what you'll be studying..."
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <DateTimePicker
              selectedDateTime={selectedDateTime}
              onDateTimeChange={handleDateTimeChange}
            />
          </Box>

          <TextField
            fullWidth
            label="Duration (minutes)"
            type="number"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
            sx={{ mb: 3 }}
            inputProps={{
              min: "15",
              step: "15",
            }}
            helperText="Minimum 15 minutes, in 15-minute increments"
          />

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
            {loading ? "Creating..." : "Create Study Group"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StudyGroupForm;
