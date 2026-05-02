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
import {
  ivyEmptyStateSx,
  ivyFieldLabelSx,
  ivyNestedCardSx,
} from "@/components/profile/ivyProfileCards";

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
    bgcolor: (t) => alpha(t.palette.secondary.main, 0.45),
    border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.28)}`,
    "& .MuiTabs-indicator": {
      display: "none",
    },
    "& .MuiTab-root": {
      flex: 1,
      textTransform: "none",
      fontSize: "0.875rem",
      fontWeight: 700,
      fontFamily: '"Source Serif 4", Georgia, serif',
      borderRadius: 2,
      minHeight: 44,
      color: "text.secondary",
      transition: "all 0.2s ease",
      "&.Mui-selected": {
        color: "primary.light",
        bgcolor: (t) => alpha(t.palette.primary.main, 0.2),
        boxShadow: (t) => `0 0 20px ${alpha(t.palette.primary.main, 0.22)}`,
      },
    },
  };

  return (
    <>
      <Typography
        variant="h5"
        fontWeight={700}
        mb={2}
        id="tutor-sessions"
        sx={{ fontFamily: '"Cormorant Garamond", Georgia, serif', letterSpacing: "0.02em" }}
      >
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

      <Card
        sx={{
          mt: 2,
          bgcolor: (theme) => alpha(theme.palette.background.paper, 1),
          border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.22)}`,
          boxShadow: `inset 0 1px 0 ${alpha("#fff", 0.55)}, 0 16px 48px ${alpha("#000", 0.12)}`,
        }}
      >
        <CardContent>
          {[pendingBookings, upcomingBookings, pastBookings][tab]?.length ===
          0 ? (
            <Typography sx={ivyEmptyStateSx}>No sessions in this tab.</Typography>
          ) : (
            <Box sx={{ display: "grid", gap: 2 }}>
              {[pendingBookings, upcomingBookings, pastBookings][tab].map(
                (booking) => (
                  <Card
                    key={booking.id}
                    sx={{
                      p: { xs: 2, sm: 2.5 },
                      ...ivyNestedCardSx,
                    }}
                    tabIndex={0}
                    role="article"
                    aria-labelledby={`booking-${booking.id}`}
                  >
                    <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                      <Typography
                        variant="h6"
                        id={`booking-${booking.id}`}
                        sx={{
                          fontWeight: 600,
                          fontFamily: '"Cormorant Garamond", Georgia, serif',
                          color: (theme) => theme.palette.primary.dark,
                        }}
                      >
                        {booking.title}
                      </Typography>
                      <Box sx={{ mt: 2, display: "grid", gap: 1.25 }}>
                        <Box>
                          <Typography component="span" sx={ivyFieldLabelSx}>
                            {user?.role === "student" ? "Tutor" : "Student"}
                          </Typography>
                          <Typography sx={{ fontWeight: 600, color: (theme) => alpha(theme.palette.common.black, 0.88) }}>
                            {booking.extendedProps.tutor ||
                              booking.extendedProps.student}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography component="span" sx={ivyFieldLabelSx}>
                            Start time
                          </Typography>
                          <Typography sx={{ fontWeight: 600, color: (theme) => alpha(theme.palette.common.black, 0.88) }}>
                            {new Date(booking.start).toLocaleString()}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography component="span" sx={ivyFieldLabelSx}>
                            Duration
                          </Typography>
                          <Typography sx={{ fontWeight: 600, color: (theme) => alpha(theme.palette.common.black, 0.88) }}>
                            {booking.extendedProps.duration || "N/A"} minutes
                          </Typography>
                        </Box>
                        <Box>
                          <Typography component="span" sx={ivyFieldLabelSx}>
                            Status
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 700,
                              color: (theme) => alpha(theme.palette.common.black, 0.88),
                              textTransform: "capitalize",
                            }}
                          >
                            {booking.extendedProps.status}
                          </Typography>
                        </Box>
                      </Box>
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
