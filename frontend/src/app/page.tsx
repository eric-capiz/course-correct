import { Container, Typography, Button, Box } from "@mui/material";

export default function Home() {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        mx: "auto",
        py: 6,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontFamily: "var(--font-heading)",
          color: "var(--primary-color)",
          fontWeight: 700,
          letterSpacing: "1px",
        }}
      >
        Course Correct
      </Typography>

      <Typography
        variant="h6"
        sx={{
          color: "var(--secondary-color)",
          maxWidth: "75%",
          margin: "auto",
          lineHeight: 1.5,
          fontWeight: 400,
        }}
      >
        A platform for students and tutors to collaborate, form study groups,
        and book tutoring sessions.
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "var(--button-primary-bg)",
            color: "#fff",
            padding: "12px 24px",
            fontSize: "1rem",
            fontWeight: 600,
            borderRadius: "8px",
            "&:hover": { backgroundColor: "var(--button-primary-hover)" },
          }}
        >
          Get Started
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderColor: "var(--button-secondary-bg)",
            color: "var(--button-secondary-bg)",
            alignItems: "center",
            padding: "12px 24px",
            fontSize: "1rem",
            fontWeight: 600,
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "var(--button-secondary-hover)",
              color: "#fff",
            },
          }}
        >
          Learn More
        </Button>
      </Box>
    </Container>
  );
}
