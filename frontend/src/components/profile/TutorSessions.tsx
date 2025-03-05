"use client";

import {
  Typography,
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import { useState } from "react";

const TutorSessions = ({ user, bookings, updateSession }) => {
  const [tab, setTab] = useState(0);

  // Filter bookings by status
  const pendingBookings = bookings.filter(
    (b) => b.extendedProps.status === "pending"
  );
  const upcomingBookings = bookings.filter(
    (b) => b.extendedProps.status === "confirmed"
  );
  const pastBookings = bookings.filter((b) =>
    ["completed", "cancelled"].includes(b.extendedProps.status)
  );

  return (
    <>
      <Typography variant="h5" fontWeight={700} mb={2} id="tutor-sessions">
        Tutor Sessions ({bookings?.length || 0})
      </Typography>
      <Tabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          padding: "4px",
          "& .MuiTab-root": {
            flex: 1,
            textTransform: "none",
            fontSize: "14px",
            fontWeight: "600",
            color: "#555",
            padding: "10px",
            "&.Mui-selected": {
              backgroundColor: "#1976d2",
              color: "#fff",
              borderRadius: "6px",
            },
          },
          "& .MuiTabs-indicator": {
            display: "none",
          },
        }}
        aria-label="Tutor Sessions Navigation"
      >
        <Tab label={`Pending (${pendingBookings.length})`} tabIndex={0} />
        <Tab label={`Upcoming (${upcomingBookings.length})`} tabIndex={0} />
        <Tab label={`Past (${pastBookings.length})`} tabIndex={0} />
      </Tabs>

      <Card sx={{ mt: 2 }}>
        <CardContent>
          {[pendingBookings, upcomingBookings, pastBookings][tab]?.length ===
          0 ? (
            <Typography>No sessions available.</Typography>
          ) : (
            <Box sx={{ display: "grid", gap: 2 }}>
              {[pendingBookings, upcomingBookings, pastBookings][tab].map(
                (booking) => (
                  <Card
                    key={booking.id}
                    sx={{
                      p: 2,
                      borderLeft: "5px solid",
                      borderColor: "#1976d2",
                    }}
                    tabIndex={0}
                    role="article"
                    aria-labelledby={`booking-${booking.id}`}
                  >
                    <CardContent>
                      <Typography variant="h6" id={`booking-${booking.id}`}>
                        {booking.title}
                      </Typography>
                      <Typography>
                        <b>{user?.role === "student" ? "Tutor" : "Student"}:</b>{" "}
                        {booking.extendedProps.tutor ||
                          booking.extendedProps.student}
                      </Typography>
                      <Typography>
                        <b>Start Time:</b>{" "}
                        {new Date(booking.start).toLocaleString()}
                      </Typography>
                      <Typography>
                        <b>Duration:</b>{" "}
                        {booking.extendedProps.duration || "N/A"} mins
                      </Typography>
                      <Typography>
                        <b>Status:</b> {booking.extendedProps.status}
                      </Typography>
                      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
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
