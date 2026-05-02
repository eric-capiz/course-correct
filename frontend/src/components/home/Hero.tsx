import { Box, Typography, CircularProgress } from "@mui/material";
import { useAuth } from "@/context/auth/authContext";
import { homePalette } from "./homePalette";

const Hero = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "78vh",
          background: `linear-gradient(165deg, ${homePalette.nightVeil} 0%, ${homePalette.oxford} 55%, ${homePalette.midnight} 100%)`,
        }}
      >
        <CircularProgress size={42} thickness={2} sx={{ color: homePalette.gold }} />
      </Box>
    );
  }

  return (
    <Box
      component="section"
      aria-labelledby="home-hero-heading"
      sx={{
        position: "relative",
        background: `linear-gradient(168deg, ${homePalette.nightVeil} 0%, ${homePalette.oxford} 42%, ${homePalette.panel} 78%, ${homePalette.midnight} 100%)`,
        minHeight: { xs: "auto", md: "min(100vh, 920px)" },
        py: { xs: 12, md: 14 },
        px: { xs: 2.5, sm: 5, md: 8 },
      }}
    >
      <Box className="home-vellum" aria-hidden />
      <Box className="home-lattice" aria-hidden />
      <Box className="home-vignette-college" aria-hidden />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 920,
          mx: "auto",
          textAlign: { xs: "left", md: "center" },
        }}
      >
        {/* Seal ornament — geometry only */}
        <Box
          aria-hidden
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-start", md: "center" },
            mb: 5,
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              border: `1px solid ${homePalette.ruleGold}`,
              transform: "rotate(45deg)",
              opacity: 0.65,
              boxShadow: `0 0 40px ${homePalette.goldGlow}`,
            }}
          />
        </Box>

        <Box className="ivy-rule-gold" sx={{ mb: 5, maxWidth: 280, mx: { md: "auto" } }} />

        <Typography
          id="home-hero-heading"
          component="h1"
          className="ivy-display"
          sx={{
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: homePalette.ivory,
            fontSize: {
              xs: "clamp(2.15rem, 7vw, 3.15rem)",
              md: "clamp(3rem, 5.2vw, 4.35rem)",
            },
            lineHeight: 1.12,
            mb: 2,
            textWrap: "balance",
          }}
        >
          Find Tutors. Join Study Groups.
          <Box
            component="span"
            sx={{
              display: "block",
              mt: { xs: 2.5, md: 3 },
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: {
                xs: "clamp(1.55rem, 4.2vw, 2.15rem)",
                md: "clamp(1.85rem, 2.8vw, 2.65rem)",
              },
              letterSpacing: "0.03em",
              color: homePalette.goldBright,
              lineHeight: 1.28,
            }}
          >
            Succeed Together.
          </Box>
        </Typography>

        <Box sx={{ height: { xs: 7, md: 9 } }} aria-hidden />

        <Box
          sx={{
            mx: { md: "auto" },
            maxWidth: 560,
            pt: { xs: 5, md: 6 },
            borderTop: `1px solid ${homePalette.ruleHair}`,
          }}
        >
          <Typography
            className="ivy-body"
            sx={{
              color: homePalette.moonInk,
              fontSize: { xs: "1.125rem", md: "1.1875rem" },
              lineHeight: 1.92,
              fontWeight: 400,
              letterSpacing: "0.01em",
            }}
          >
            Course Correct is your all-in-one platform to collaborate, form study groups, and
            book tutoring sessions seamlessly.
          </Typography>
        </Box>

        <Box
          aria-hidden
          sx={{
            mt: { xs: 6, md: 8 },
            display: "flex",
            justifyContent: { xs: "flex-start", md: "center" },
          }}
        >
          <Box className="ivy-rule-gold" sx={{ width: { xs: 120, md: 160 }, opacity: 0.55 }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
