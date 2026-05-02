import { Box, Typography, Container } from "@mui/material";
import { School, VolunteerActivism, Group } from "@mui/icons-material";
import { homePalette } from "./homePalette";

const steps = [
  {
    icon: School,
    roman: "I",
    title: "Sign Up as a Tutor or Student",
    body: "Any student (9th grade – college senior) can join as a student or tutor. Choose your role and set up your profile.",
  },
  {
    icon: VolunteerActivism,
    roman: "II",
    title: "Tutors Volunteer Their Time",
    body: "Tutors select their subject expertise and grade level. Students at that grade level or below can book sessions with them.",
  },
  {
    icon: Group,
    roman: "III",
    title: "Students Create Study Groups",
    body: "Students can form study groups with others in their grade and subject, organizing discussions and sharing notes.",
  },
];

const HowItWorks = () => {
  return (
    <Box
      component="section"
      aria-labelledby="home-how-heading"
      sx={{
        position: "relative",
        bgcolor: homePalette.parchment,
        py: { xs: 11, md: 15 },
        borderTop: `1px solid ${homePalette.ruleHair}`,
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.5,
          background: `linear-gradient(180deg, ${homePalette.ivory} 0%, transparent 40%)`,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4 }, position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center", mb: { xs: 9, md: 11 }, maxWidth: 680, mx: "auto" }}>
          <Typography
            id="home-how-heading"
            component="h2"
            className="ivy-display"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "2.5rem", md: "clamp(2.65rem, 4vw, 3.5rem)" },
              letterSpacing: "-0.03em",
              color: homePalette.oxford,
              mb: 3,
            }}
          >
            How It Works
          </Typography>
          <Box className="ivy-rule-gold" sx={{ width: 200, mx: "auto" }} />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Box
                key={step.title}
                sx={{
                  px: { xs: 0, md: 5 },
                  py: { xs: 5, md: 4 },
                  borderLeft: {
                    md: index === 0 ? "none" : `1px solid ${homePalette.ruleHair}`,
                  },
                  borderTop: {
                    xs: index === 0 ? "none" : `1px solid rgba(26, 21, 18, 0.12)`,
                    md: "none",
                  },
                  textAlign: { xs: "left", md: "center" },
                }}
              >
                <Typography
                  aria-hidden
                  className="ivy-display"
                  sx={{
                    fontSize: { xs: "2.75rem", md: "3.25rem" },
                    fontWeight: 600,
                    color: homePalette.goldBurnished,
                    letterSpacing: "0.12em",
                    mb: 2,
                  }}
                >
                  {step.roman}
                </Typography>

                <Box
                  sx={{
                    mx: { md: "auto" },
                    mb: 3,
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    border: `1px solid ${homePalette.gold}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: homePalette.oxford,
                    background: `linear-gradient(165deg, ${homePalette.ivory}, ${homePalette.parchmentCool})`,
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.9), 0 12px 36px rgba(0,31,61,0.06)`,
                  }}
                >
                  <Icon sx={{ fontSize: 24 }} />
                </Box>

                <Typography
                  component="h3"
                  className="ivy-display"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "1.2rem", md: "1.28rem" },
                    letterSpacing: "-0.02em",
                    color: homePalette.ink,
                    mb: 2,
                    lineHeight: 1.35,
                  }}
                >
                  {step.title}
                </Typography>
                <Typography
                  className="ivy-body"
                  sx={{
                    color: homePalette.inkSoft,
                    fontSize: { xs: "1.02rem", md: "1.055rem" },
                    lineHeight: 1.88,
                    fontWeight: 400,
                  }}
                >
                  {step.body}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks;
