import { Box, Typography, Button, Container } from "@mui/material";

const Hero = () => {
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
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            gap: 2,
            mt: 4,
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "var(--button-primary-bg)",
              color: "#fff",
              padding: { xs: "10px 18px", md: "12px 24px" },
              fontSize: { xs: "0.9rem", md: "1rem" },
              fontWeight: 600,
              borderRadius: "8px",
              width: { xs: "100%", sm: "auto" }, // Full width on mobile
              "&:hover": { backgroundColor: "var(--button-primary-hover)" },
            }}
            aria-label="Find a Tutor"
          >
            Find a Tutor
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: "var(--button-secondary-bg)",
              color: "var(--button-secondary-bg)",
              padding: { xs: "10px 18px", md: "12px 24px" },
              fontSize: { xs: "0.9rem", md: "1rem" },
              fontWeight: 600,
              borderRadius: "8px",
              width: { xs: "100%", sm: "auto" },
              "&:hover": {
                backgroundColor: "var(--button-secondary-hover)",
                color: "#fff",
              },
            }}
            aria-label="Create a Study Group"
          >
            Create Study Group
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
