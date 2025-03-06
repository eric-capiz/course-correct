"use client";

import { useState } from "react";
import { Typography, Box, Card, CardContent, Button } from "@mui/material";
import TutorCalendar from "@/components/calendar/TutorCalendar";
import AddAvailabilitySlot from "@/components/calendar/AddAvailabilitySot";
import { useTutorAvailability } from "@/context/tutorAvailability/tutorAvailabilityContext";

interface TutorAvailabilityProps {
  user: {
    role: string;
    subjects: string[];
    gradeLevel: string;
  };
}

const TutorAvailability = ({ user }: TutorAvailabilityProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { availability } = useTutorAvailability();

  if (user?.role !== "tutor") return null;

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowAddForm(false);
  };

  const selectedDateSlots = selectedDate
    ? availability.filter(
        (slot) =>
          new Date(slot.day).toDateString() === selectedDate.toDateString()
      )
    : [];

  return (
    <Box sx={{ mb: { xs: 4, md: 12 } }}>
      <Typography variant="h5" fontWeight={700} mt={6} mb={2} id="availability">
        Your Availability
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <TutorCalendar
              onDateSelect={handleDateSelect}
              selectedDate={selectedDate}
            />
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            {selectedDate ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => setShowAddForm(true)}
                    sx={{
                      backgroundColor: "var(--primary-color)",
                      "&:hover": {
                        backgroundColor: "var(--button-primary-hover)",
                      },
                    }}
                  >
                    Add Slot
                  </Button>
                </Box>

                {showAddForm ? (
                  <AddAvailabilitySlot
                    selectedDate={selectedDate}
                    subjects={user.subjects}
                    onSuccess={() => setShowAddForm(false)}
                  />
                ) : selectedDateSlots.length > 0 ? (
                  <Box>
                    {selectedDateSlots.map((slot) => (
                      <Box
                        key={slot._id}
                        sx={{
                          p: 2,
                          mb: 1,
                          border: 1,
                          borderColor: "divider",
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant="subtitle1">
                          {slot.subject}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(slot.startTime).toLocaleTimeString()} -
                          {new Date(slot.endTime).toLocaleTimeString()}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography color="text.secondary">
                    No availability slots for this day
                  </Typography>
                )}
              </>
            ) : (
              <Typography>Select a date to view or add availability</Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default TutorAvailability;
