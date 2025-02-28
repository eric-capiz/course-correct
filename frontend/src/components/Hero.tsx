"use client";

import {
  Box,
  Typography,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "@/context/auth/AuthContext";

const Hero = () => {
  const { user, loading } = useAuth();

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
        {user && ( // Only render buttons if user is logged in
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              gap: 2,
              mt: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              {user.role === "student" ? (
                // Student buttons
                <>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "var(--button-primary-bg)",
                      color: "#fff",
                      padding: { xs: "10px 18px", md: "12px 24px" },
                      fontSize: { xs: "0.9rem", md: "1rem" },
                      fontWeight: 600,
                      borderRadius: "8px",
                      width: { xs: "100%", sm: "auto" },
                      "&:hover": {
                        backgroundColor: "var(--button-primary-hover)",
                      },
                    }}
                    aria-label="Book Tutor Session"
                  >
                    Book Tutor Session
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
                </>
              ) : user.role === "tutor" ? (
                // Tutor button
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "var(--button-primary-bg)",
                    color: "#fff",
                    padding: { xs: "10px 18px", md: "12px 24px" },
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    fontWeight: 600,
                    borderRadius: "8px",
                    width: { xs: "100%", sm: "auto" },
                    "&:hover": {
                      backgroundColor: "var(--button-primary-hover)",
                    },
                  }}
                  aria-label="Add Tutor Availability"
                >
                  Add Tutor Availability
                </Button>
              ) : null}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Hero;
