import { Box, Typography, Container } from "@mui/material";
import {
  CalendarMonth,
  Group,
  VolunteerActivism,
  School,
} from "@mui/icons-material";
import { homePalette } from "./homePalette";

const items = [
  {
    icon: CalendarMonth,
    title: "Flexible Tutor Booking",
    body: "Tutors set their availability, and students book sessions at convenient times.",
  },
  {
    icon: Group,
    title: "Student-Led Study Groups",
    body: "Create and join study groups based on your grade level and subject.",
  },
  {
    icon: VolunteerActivism,
    title: "Volunteer-Based Tutoring",
    body: "Tutors volunteer their time and set their expertise level for students to book them.",
  },
  {
    icon: School,
    title: "Seamless Scheduling",
    body: "Use the built-in calendar to track upcoming tutoring sessions easily.",
  },
];

const Features = () => {
  return (
    <Box
      component="section"
      aria-labelledby="home-features-heading"
      sx={{
        position: "relative",
        background: `linear-gradient(180deg, ${homePalette.midnight} 0%, ${homePalette.panel} 45%, ${homePalette.midnight} 100%)`,
        py: { xs: 11, md: 15 },
        borderTop: `1px solid ${homePalette.ruleHair}`,
      }}
    >
      <Box className="home-vellum" sx={{ opacity: 0.2 }} aria-hidden />
      <Box className="home-lattice" sx={{ opacity: 0.035 }} aria-hidden />

      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4 }, position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center", mb: { xs: 9, md: 11 } }}>
          <Typography
            id="home-features-heading"
            component="h2"
            className="ivy-display"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "2.5rem", md: "clamp(2.65rem, 4vw, 3.5rem)" },
              letterSpacing: "-0.03em",
              color: homePalette.ivory,
              mb: 3,
              textShadow: "0 2px 48px rgba(0,0,0,0.35)",
            }}
          >
            Platform Features
          </Typography>
          <Box className="ivy-rule-gold" sx={{ width: 220, mx: "auto", opacity: 0.95 }} />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: { xs: 3, md: 4 },
          }}
        >
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Box
                key={item.title}
                className="ivy-folio-lift"
                sx={{
                  bgcolor: homePalette.parchment,
                  borderRadius: 0.5,
                  p: { xs: 4, md: 5 },
                  borderTop: `3px solid ${homePalette.gold}`,
                  borderLeft: `1px solid ${homePalette.ruleHair}`,
                  borderRight: `1px solid ${homePalette.ruleHair}`,
                  borderBottom: `1px solid rgba(26,21,18,0.08)`,
                  boxShadow: `${homePalette.shadowLift}, inset 0 1px 0 rgba(255,255,255,0.75)`,
                  display: "flex",
                  gap: 3.5,
                  alignItems: "flex-start",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    flexShrink: 0,
                    width: 54,
                    height: 54,
                    borderRadius: 0.5,
                    background: `linear-gradient(155deg, ${homePalette.oxford}, ${homePalette.midnight})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: homePalette.goldBright,
                    border: `1px solid ${homePalette.ruleGold}`,
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 28px rgba(0,0,0,0.35)`,
                  }}
                >
                  <Icon sx={{ fontSize: 26 }} />
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    component="h3"
                    className="ivy-display"
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "1.22rem", md: "1.35rem" },
                      letterSpacing: "-0.025em",
                      color: homePalette.ink,
                      mb: 2,
                      lineHeight: 1.32,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    className="ivy-body"
                    sx={{
                      color: homePalette.inkSoft,
                      fontSize: "1.02rem",
                      lineHeight: 1.88,
                      fontWeight: 400,
                    }}
                  >
                    {item.body}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default Features;
