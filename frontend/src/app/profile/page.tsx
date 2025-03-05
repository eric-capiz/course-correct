"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth/authContext";
import { useUser } from "@/context/users/userContext";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/booking/bookingContext";
import EditProfileDialog from "@/components/modals/EditProfile";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  AccountCircle,
  AlternateEmail,
  Email,
  School,
  Class,
  Badge,
  Edit,
} from "@mui/icons-material";

const Profile = () => {
  const { user: authUser, loading: authLoading } = useAuth();
  const { user, fetchUser, updateUser } = useUser();
  const { bookings, updateSession } = useBooking();
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    if (!authLoading && authUser === null) {
      router.push("/");
    }
  }, [authUser, authLoading, router]);

  useEffect(() => {
    if (authUser?._id) {
      fetchUser(authUser._id)
        .then(() => console.log("User fetch completed"))
        .catch((err) => console.error("User fetch failed:", err));
    }
  }, [authUser?._id, fetchUser]);

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
    <Container
      maxWidth="lg"
      sx={{ display: "flex", flexWrap: "wrap", gap: 4, py: 6 }}
      role="main"
    >
      <Box
        sx={{
          flex: "1 1 30%",
          borderRight: { md: "1px solid #ddd" },
          pr: { md: 3 },
          p: 3,
          borderRadius: "8px",
          backgroundColor: "#f9fafb",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
        aria-labelledby="profile-details"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            gap: 1,
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            color="primary"
            id="profile-details"
          >
            Profile Details
          </Typography>
          <Tooltip title="Edit Profile">
            <IconButton
              onClick={() => setOpenEditDialog(true)}
              aria-label="edit profile"
              sx={{
                color: "var(--primary-color)",
                "&:hover": {
                  backgroundColor: "rgba(30, 58, 138, 0.04)",
                },
                "&:focus-visible": {
                  outline: "2px solid var(--primary-color)",
                  outlineOffset: "2px",
                },
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccountCircle sx={{ color: "var(--primary-color)" }} />
            <Typography>
              <b>Name:</b> {user?.name}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AlternateEmail sx={{ color: "var(--primary-color)" }} />
            <Typography>
              <b>Username:</b> {user?.username}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Email sx={{ color: "var(--primary-color)" }} />
            <Typography>
              <b>Email:</b> {user?.email}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Badge sx={{ color: "var(--primary-color)" }} />
            <Typography>
              <b>Role:</b> {user?.role}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <School sx={{ color: "var(--primary-color)" }} />
            <Typography>
              <b>Grade Level:</b> {user?.gradeLevel}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Class sx={{ color: "var(--primary-color)" }} />
            <Typography>
              <b>Subjects:</b> {user?.subjects.join(", ")}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ flex: "1 1 65%" }}>
        {/* Student-Specific Section: Study Groups */}
        {user?.role === "student" && (
          <>
            <Typography variant="h5" fontWeight={700} mb={2} id="study-groups">
              Study Groups ({user?.joinedStudyGroups?.length || 0})
            </Typography>
            <Card sx={{ mb: 4 }}>
              <CardContent>
                {user?.joinedStudyGroups?.length > 0 ? (
                  <Typography>Study groups will be listed here.</Typography>
                ) : (
                  <Typography>No study groups joined yet.</Typography>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {/* Tutor-Specific Section: Availability */}
        {user?.role === "tutor" && (
          <>
            <Typography
              variant="h5"
              fontWeight={700}
              mt={6}
              mb={2}
              id="availability"
            >
              Your Availability
            </Typography>
            <Card sx={{ mb: 12 }}>
              <CardContent>
                <Typography>
                  Weekly availability will be displayed here.
                </Typography>
              </CardContent>
            </Card>
          </>
        )}

        {/* Shared Section: Tutor Sessions */}
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
                          <b>
                            {user?.role === "student" ? "Tutor" : "Student"}:
                          </b>{" "}
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
                          {user?.role === "tutor" &&
                            booking.extendedProps.status === "pending" && (
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
      </Box>

      <EditProfileDialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        user={user}
        updateUser={updateUser}
      />
    </Container>
  );
};

export default Profile;
