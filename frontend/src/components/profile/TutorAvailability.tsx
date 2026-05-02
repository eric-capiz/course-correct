import { useState } from "react";
import { Typography, Box, Card, CardContent, Button } from "@mui/material";
import { alpha } from "@mui/material/styles";
import TutorCalendar from "@/components/calendar/TutorCalendar";
import AddAvailabilitySlot from "@/components/calendar/AddAvailabilitySot";
import { useTutorAvailability } from "@/context/tutorAvailability/tutorAvailabilityContext";
import { ivyBodyMutedSx } from "@/components/profile/ivyProfileCards";
import { ivyTokens } from "@/theme/tokens";

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
    ? availability.filter((slot) => {
        return slot.day === selectedDate.toLocaleDateString("en-CA");
      })
    : [];

  return (
    <Box sx={{ mb: { xs: 4, md: 12 } }}>
      <Typography
        variant="h5"
        fontWeight={700}
        mt={6}
        mb={2}
        id="availability"
        sx={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          letterSpacing: "0.02em",
          color: "text.primary",
        }}
      >
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
                    color="primary"
                    onClick={() => setShowAddForm(true)}
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
                    {selectedDateSlots.map((slot) => {
                      const displayDate = new Date(slot.startTime);
                      displayDate.setDate(displayDate.getDate());

                      return (
                        <Box
                          key={slot._id}
                          sx={{
                            p: 2,
                            mb: 1,
                            borderRadius: 1,
                            border: `1px solid ${alpha(ivyTokens.gold, 0.32)}`,
                            bgcolor: alpha(ivyTokens.ink, 0.04),
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 700, color: alpha(ivyTokens.ink, 0.92) }}
                          >
                            {slot.subject}
                          </Typography>
                          <Typography variant="body2" sx={{ ...ivyBodyMutedSx, mb: 0.5 }}>
                            {displayDate.toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </Typography>
                          <Typography variant="body2" sx={ivyBodyMutedSx}>
                            {new Date(slot.startTime).toLocaleString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })}{" "}
                            –
                            {new Date(slot.endTime).toLocaleString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                ) : (
                  <Typography sx={ivyBodyMutedSx}>
                    No availability slots for this day
                  </Typography>
                )}
              </>
            ) : (
              <Typography sx={ivyBodyMutedSx}>
                Select a date to view or add availability
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default TutorAvailability;
