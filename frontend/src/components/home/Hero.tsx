import { Box, Typography, Container, CircularProgress } from "@mui/material";
import { useAuth } from "@/context/auth/tempauthContext";

const Hero = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        py: { xs: 6, md: 8 },
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h4"
          sx={{
            fontFamily: "var(--font-heading)",
            color: "var(--primary-color)",
            fontWeight: 700,
            letterSpacing: "1px",
            fontSize: { xs: "2rem", md: "2.5rem" },
            mb: 2,
          }}
        >
          Find Tutors. Join Study Groups. Succeed Together.
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "var(--secondary-color)",
            maxWidth: "90%",
            margin: "auto",
            lineHeight: 1.5,
            fontWeight: 400,
            fontSize: { xs: "1rem", md: "1.25rem" },
            mt: 2,
          }}
        >
          Course Correct is your all-in-one platform to collaborate, form study
          groups, and book tutoring sessions seamlessly.
        </Typography>
      </Container>
    </Box>
  );
};

export default Hero;
