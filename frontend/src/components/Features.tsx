import { Box, Typography, Card, CardContent, Container } from "@mui/material";
import {
  CalendarMonth,
  Group,
  VolunteerActivism,
  School,
} from "@mui/icons-material";

const Features = () => {
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, px: 2, textAlign: "center" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            fontFamily: "var(--font-heading)",
            color: "var(--primary-color)",
            fontWeight: 700,
            mb: 4,
          }}
        >
          Platform Features
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" }, // 2-column grid on desktop
            gap: 3,
          }}
        >
          <Card
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              borderRadius: "8px",
              boxShadow: 2,
            }}
          >
            <CalendarMonth
              sx={{ fontSize: 40, color: "var(--primary-color)", mb: 2 }}
            />
            <Typography variant="h6" fontWeight={600}>
              Flexible Tutor Booking
            </Typography>
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                Tutors set their availability, and students book sessions at
                convenient times.
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              borderRadius: "8px",
              boxShadow: 2,
            }}
          >
            <Group
              sx={{ fontSize: 40, color: "var(--primary-color)", mb: 2 }}
            />
            <Typography variant="h6" fontWeight={600}>
              Student-Led Study Groups
            </Typography>
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                Create and join study groups based on your grade level and
                subject.
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              borderRadius: "8px",
              boxShadow: 2,
            }}
          >
            <VolunteerActivism
              sx={{ fontSize: 40, color: "var(--primary-color)", mb: 2 }}
            />
            <Typography variant="h6" fontWeight={600}>
              Volunteer-Based Tutoring
            </Typography>
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                Tutors volunteer their time and set their expertise level for
                students to book them.
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              borderRadius: "8px",
              boxShadow: 2,
            }}
          >
            <School
              sx={{ fontSize: 40, color: "var(--primary-color)", mb: 2 }}
            />
            <Typography variant="h6" fontWeight={600}>
              Seamless Scheduling
            </Typography>
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                Use the built-in calendar to track upcoming tutoring sessions
                easily.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default Features;
