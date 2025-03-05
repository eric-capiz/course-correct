import { Box, Typography, Card, CardContent, Container } from "@mui/material";
import { School, VolunteerActivism, Group } from "@mui/icons-material";

const HowItWorks = () => {
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
          How It Works
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3,
          }}
        >
          {/* Card 1: Sign Up */}
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
              Sign Up as a Tutor or Student
            </Typography>
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                Any student (9th grade – college senior) can join as a student
                or tutor. Choose your role and set up your profile.
              </Typography>
            </CardContent>
          </Card>

          {/* Card 2: Tutors Volunteer */}
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
              Tutors Volunteer Their Time
            </Typography>
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                Tutors select their subject expertise and grade level. Students
                at that grade level or below can book sessions with them.
              </Typography>
            </CardContent>
          </Card>

          {/* Card 3: Students Create Study Groups */}
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
              Students Create Study Groups
            </Typography>
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                Students can form study groups with others in their grade and
                subject, organizing discussions and sharing notes.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks;
