import {
  Typography,
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useState } from "react";

const TutorSessions = ({ user, bookings, updateSession }) => {
  const [tab, setTab] = useState(0);

  const pendingBookings = bookings.filter(
    (b) => b.extendedProps.status === "pending"
  );
  const upcomingBookings = bookings.filter(
    (b) => b.extendedProps.status === "confirmed"
  );
  const pastBookings = bookings.filter((b) =>
    ["completed", "cancelled"].includes(b.extendedProps.status)
  );

  const tabsSx = {
    mb: 2,
    minHeight: 52,
    px: 0.75,
    py: 0.5,
    borderRadius: 3,
    bgcolor: (t) => alpha(t.palette.background.paper, 0.65),
    border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.15)}`,
    "& .MuiTabs-indicator": {
      display: "none",
    },
    "& .MuiTab-root": {
      flex: 1,
      textTransform: "none",
      fontSize: "0.875rem",
      fontWeight: 700,
      borderRadius: 2,
      minHeight: 44,
      color: "text.secondary",
      transition: "all 0.2s ease",
      "&.Mui-selected": {
        color: "primary.light",
        bgcolor: (t) => alpha(t.palette.primary.main, 0.18),
        boxShadow: (t) => `0 0 24px ${alpha(t.palette.primary.main, 0.25)}`,
      },
    },
  };

  return (
    <>
      <Typography variant="h5" fontWeight={800} mb={2} id="tutor-sessions">
        Tutor Sessions ({bookings?.length || 0})
      </Typography>
      <Tabs
        value={tab}
        onChange={(_e, newValue) => setTab(newValue)}
        sx={tabsSx}
        aria-label="Tutor Sessions Navigation"
      >
        <Tab label={`Pending (${pendingBookings.length})`} />
        <Tab label={`Upcoming (${upcomingBookings.length})`} />
        <Tab label={`Past (${pastBookings.length})`} />
      </Tabs>

      <Card sx={{ mt: 2 }}>
        <CardContent>
          {[pendingBookings, upcomingBookings, pastBookings][tab]?.length ===
          0 ? (
            <Typography color="text.secondary">No sessions available.</Typography>
          ) : (
            <Box sx={{ display: "grid", gap: 2 }}>
              {[pendingBookings, upcomingBookings, pastBookings][tab].map(
                (booking) => (
                  <Card
                    key={booking.id}
                    sx={{
                      p: 2,
                      borderLeft: "5px solid",
                      borderColor: "primary.main",
                    }}
                    tabIndex={0}
                    role="article"
                    aria-labelledby={`booking-${booking.id}`}
                  >
                    <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                      <Typography variant="h6" id={`booking-${booking.id}`} fontWeight={800}>
                        {booking.title}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        <Box component="span" fontWeight={700}>
                          {user?.role === "student" ? "Tutor" : "Student"}:
                        </Box>{" "}
                        {booking.extendedProps.tutor ||
                          booking.extendedProps.student}
                      </Typography>
                      <Typography variant="body2">
                        <Box component="span" fontWeight={700}>
                          Start Time:
                        </Box>{" "}
                        {new Date(booking.start).toLocaleString()}
                      </Typography>
                      <Typography variant="body2">
                        <Box component="span" fontWeight={700}>
                          Duration:
                        </Box>{" "}
                        {booking.extendedProps.duration || "N/A"} mins
                      </Typography>
                      <Typography variant="body2">
                        <Box component="span" fontWeight={700}>
                          Status:
                        </Box>{" "}
                        {booking.extendedProps.status}
                      </Typography>
                      <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
                        {user?.role === "tutor" && (
                          <>
                            {booking.extendedProps.status === "pending" && (
                              <Button
                                variant="contained"
                                color="success"
                                onClick={() =>
                                  updateSession(booking.id, "confirmed")
                                }
                                aria-label={`Confirm session for ${booking.title}`}
                              >
                                Confirm
                              </Button>
                            )}
                            {booking.extendedProps.status === "confirmed" && (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                  updateSession(booking.id, "completed")
                                }
                                aria-label={`Mark session complete for ${booking.title}`}
                              >
                                Complete
                              </Button>
                            )}
                          </>
                        )}
                        {user?.role === "student" &&
                          booking.extendedProps.status !== "completed" &&
                          booking.extendedProps.status !== "cancelled" && (
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() =>
                                updateSession(booking.id, "cancelled")
                              }
                              aria-label={`Cancel session for ${booking.title}`}
                            >
                              Cancel
                            </Button>
                          )}
                      </Box>
                    </CardContent>
                  </Card>
                )
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default TutorSessions;
