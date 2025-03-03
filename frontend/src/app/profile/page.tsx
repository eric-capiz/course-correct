"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/auth/AuthContext";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
} from "@mui/material";
import {
  AccountCircle,
  AlternateEmail,
  Email,
  School,
  Class,
  Badge,
} from "@mui/icons-material";
import { useState } from "react";

const Profile = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <Container maxWidth="lg" sx={{ display: "flex", gap: 4, py: 6 }}>
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

      <Box sx={{ width: "70%" }}>
        {user.role === "student" && (
          <>
            <Typography variant="h5" fontWeight={700} mb={2}>
              Study Groups ({user?.joinedStudyGroups?.length})
            </Typography>
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography>No study groups joined yet.</Typography>
              </CardContent>
            </Card>

            <Typography variant="h5" fontWeight={700} mb={2}>
              Your Tutor Sessions
            </Typography>
            <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
              <Tab label="Pending" />
              <Tab label="Upcoming" />
              <Tab label="Past" />
            </Tabs>
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography>
                  {tab === 0 && "No pending tutor sessions."}
                  {tab === 1 && "No upcoming tutor sessions."}
                  {tab === 2 && "No past tutor sessions."}
                </Typography>
              </CardContent>
            </Card>
          </>
        )}

        {user.role === "tutor" && (
          <>
            <Typography variant="h5" fontWeight={700} mb={2}>
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
