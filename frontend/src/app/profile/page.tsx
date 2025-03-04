"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth/authContext";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/booking/bookingContext";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import {
  AccountCircle,
  AlternateEmail,
  Email,
  School,
  Class,
  Badge,
} from "@mui/icons-material";

const Profile = () => {
  const { user } = useAuth();
  const { bookings } = useBooking();
  const router = useRouter();
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) return null;

  // Separate sessions based on status
  const pendingBookings = bookings.filter(
    (b) => b.extendedProps.status === "pending"
  );
  const upcomingBookings = bookings.filter(
    (b) => b.extendedProps.status === "confirmed"
  );
  const pastBookings = bookings.filter((b) =>
    ["completed", "cancelled"].includes(b.extendedProps.status)
  );

  console.log(bookings);

  return (
    <Container maxWidth="lg" sx={{ display: "flex", gap: 4, py: 6 }}>
      {/* Profile Details */}
      <Box
        sx={{
          width: "30%",
          borderRight: "1px solid #ddd",
          pr: 3,
          p: 3,
          borderRadius: "8px",
          backgroundColor: "#f9fafb",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h5" fontWeight={700} mb={2} color="primary">
          Profile Details
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccountCircle sx={{ color: "var(--primary-color)" }} />
            <Typography>
              <b>Name:</b> {user.name}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AlternateEmail sx={{ color: "var(--primary-color)" }} />
            <Typography>
              <b>Username:</b> {user.username}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Email sx={{ color: "var(--primary-color)" }} />
            <Typography>
              <b>Email:</b> {user.email}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Badge sx={{ color: "var(--primary-color)" }} />
            <Typography>
              <b>Role:</b> {user.role}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Class sx={{ color: "var(--primary-color)" }} />
            <Typography>
              <b>Subjects:</b> {user.subjects.join(", ")}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <School sx={{ color: "var(--primary-color)" }} />
            <Typography>
              <b>Grade Level:</b> {user.gradeLevel}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Main Section */}
      <Box sx={{ width: "70%" }}>
        {/* Student Only: Study Groups */}
        {user.role === "student" && (
          <>
            <Typography variant="h5" fontWeight={700} mb={2}>
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

        {/* Tutor Sessions (Both Students & Tutors) */}
        <Typography variant="h5" fontWeight={700} mb={2}>
          Your Tutor Sessions ({bookings?.length || 0})
        </Typography>
        <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
          <Tab label={`Pending (${pendingBookings.length})`} />
          <Tab label={`Upcoming (${upcomingBookings.length})`} />
          <Tab label={`Past (${pastBookings.length})`} />
        </Tabs>

        <Card sx={{ mt: 2 }}>
          <CardContent>
            {tab === 0 && pendingBookings.length === 0 && (
              <Typography>No pending tutor sessions.</Typography>
            )}
            {tab === 1 && upcomingBookings.length === 0 && (
              <Typography>No upcoming tutor sessions.</Typography>
            )}
            {tab === 2 && pastBookings.length === 0 && (
              <Typography>No past tutor sessions.</Typography>
            )}

            {/* Session Table */}
            {[pendingBookings, upcomingBookings, pastBookings][tab]?.length >
              0 && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Subject</b>
                    </TableCell>
                    <TableCell>
                      <b>{user.role === "student" ? "Tutor" : "Student"}</b>
                    </TableCell>
                    <TableCell>
                      <b>Start Time</b>
                    </TableCell>
                    <TableCell>
                      <b>Duration</b>
                    </TableCell>
                    <TableCell>
                      <b>Status</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[pendingBookings, upcomingBookings, pastBookings][tab].map(
                    (booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.title}</TableCell>
                        <TableCell>
                          {booking.extendedProps.tutor ||
                            booking.extendedProps.student}
                        </TableCell>
                        <TableCell>
                          {new Date(booking.start).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {booking.extendedProps.duration || "N/A"} mins
                        </TableCell>
                        <TableCell>{booking.extendedProps.status}</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {user.role === "tutor" && (
          <>
            <Typography variant="h5" fontWeight={700} mt={4}>
              Your Availability
            </Typography>
            <Card>
              <CardContent>
                <Typography>
                  Weekly availability will be displayed here.
                </Typography>
              </CardContent>
            </Card>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Profile;
