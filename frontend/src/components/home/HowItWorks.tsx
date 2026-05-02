import { Box, Typography, Container } from "@mui/material";
import { School, VolunteerActivism, Group } from "@mui/icons-material";
import { homePalette } from "./homePalette";

const steps = [
  {
    icon: School,
    title: "Sign Up as a Tutor or Student",
    body: "Any student (9th grade – college senior) can join as a student or tutor. Choose your role and set up your profile.",
    hue: homePalette.bloom,
  },
  {
    icon: VolunteerActivism,
    title: "Tutors Volunteer Their Time",
    body: "Tutors select their subject expertise and grade level. Students at that grade level or below can book sessions with them.",
    hue: homePalette.violet,
  },
  {
    icon: Group,
    title: "Students Create Study Groups",
    body: "Students can form study groups with others in their grade and subject, organizing discussions and sharing notes.",
    hue: homePalette.rose,
  },
];

const HowItWorks = () => {
  return (
    <Box
      component="section"
      aria-labelledby="home-how-heading"
      sx={{
        position: "relative",
        bgcolor: homePalette.void,
        py: { xs: 9, md: 12 },
        overflow: "hidden",
        clipPath: { md: "polygon(0 4vw, 100% 0, 100% 100%, 0 100%)" },
        mt: { md: "-4vw" },
        pt: { xs: 9, md: `calc(12rem + 4vw)` },
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.35,
          background:
            "radial-gradient(ellipse 80% 50% at 0% 50%, rgba(34,211,238,0.15), transparent 55%), radial-gradient(ellipse 60% 60% at 100% 30%, rgba(251,113,133,0.12), transparent 50%)",
          pointerEvents: "none",
        }}
      />
      <Box className="home-grain" sx={{ opacity: 0.04 }} aria-hidden />

      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, position: "relative", zIndex: 1 }}>
        <Box sx={{ mb: { xs: 6, md: 8 }, textAlign: { xs: "left", md: "center" } }}>
          <Typography
            id="home-how-heading"
            component="h2"
            className="home-chrome-text"
            sx={{
              fontWeight: 900,
              letterSpacing: "-0.045em",
              fontSize: { xs: "2.35rem", md: "clamp(2.5rem, 4.5vw, 3.75rem)" },
              lineHeight: 1.05,
              mb: 2,
            }}
          >
            How It Works
          </Typography>
          <Box className="home-rail-shimmer" sx={{ width: { xs: 220, sm: 320 }, height: 3, mx: { md: "auto" } }} />
        </Box>

        <Box sx={{ position: "relative" }}>
          <Box
            aria-hidden
            sx={{
              display: { xs: "none", lg: "block" },
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 3,
              ml: "-1.5px",
              background: `linear-gradient(180deg, ${homePalette.bloom}, ${homePalette.violet}, ${homePalette.rose}, ${homePalette.gold})`,
              borderRadius: 2,
              opacity: 0.55,
              filter: "blur(0.5px)",
            }}
          />

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isOdd = index % 2 === 1;
            const big = String(index + 1).padStart(2, "0");

            return (
              <Box
                key={step.title}
                sx={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
                  gap: { xs: 2, lg: 6 },
                  mb: index < steps.length - 1 ? { xs: 4, md: 7 } : 0,
                  alignItems: "center",
                  direction: isOdd ? "rtl" : "ltr",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    minHeight: { lg: 200 },
                    display: { xs: "none", lg: "flex" },
                    alignItems: "center",
                    justifyContent: "center",
                    direction: "ltr",
                  }}
                  aria-hidden
                >
                  <Typography
                    sx={{
                      fontWeight: 900,
                      fontSize: "clamp(6rem, 14vw, 11rem)",
                      lineHeight: 1,
                      letterSpacing: "-0.08em",
                      background: `linear-gradient(145deg, rgba(255,255,255,0.06), ${step.hue}22)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      userSelect: "none",
                    }}
                  >
                    {big}
                  </Typography>
                </Box>

                <Box sx={{ direction: "ltr" }}>
                  <Box
                    className="home-holo-frame"
                    sx={{
                      borderRadius: 4,
                      p: { xs: 2.75, md: 4 },
                      bgcolor: homePalette.glass,
                      backdropFilter: "blur(20px) saturate(150%)",
                      WebkitBackdropFilter: "blur(20px) saturate(150%)",
                      border: `1px solid ${homePalette.line}`,
                      boxShadow: `
                        inset 0 1px 0 rgba(255,255,255,0.1),
                        0 28px 90px rgba(0,0,0,0.5),
                        0 0 60px ${step.hue}14
                      `,
                      transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                      transform: { lg: isOdd ? "perspective(1200px) rotateY(-2deg)" : "perspective(1200px) rotateY(2deg)" },
                      "&:hover": {
                        transform: {
                          lg: isOdd
                            ? "perspective(1200px) rotateY(0deg) translateY(-6px)"
                            : "perspective(1200px) rotateY(0deg) translateY(-6px)",
                        },
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 2.5, flexDirection: { xs: "column", sm: "row" } }}>
                      <Box
                        sx={{
                          display: { lg: "none" },
                          alignSelf: "flex-start",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 2,
                          bgcolor: `${step.hue}22`,
                          color: step.hue,
                          fontWeight: 900,
                          fontSize: "0.85rem",
                          letterSpacing: "0.2em",
                        }}
                      >
                        {big}
                      </Box>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          flexShrink: 0,
                          borderRadius: 3,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: `linear-gradient(145deg, ${step.hue}33, rgba(0,0,0,0.25))`,
                          color: homePalette.chrome,
                          border: `1px solid rgba(255,255,255,0.12)`,
                          boxShadow: `0 0 40px ${step.hue}28`,
                        }}
                      >
                        <Icon sx={{ fontSize: 34 }} />
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          component="h3"
                          sx={{
                            fontWeight: 900,
                            letterSpacing: "-0.03em",
                            fontSize: { xs: "1.25rem", md: "1.45rem" },
                            color: homePalette.chrome,
                            mb: 1.5,
                            lineHeight: 1.25,
                          }}
                        >
                          {step.title}
                        </Typography>
                        <Typography
                          sx={{
                            color: homePalette.muted,
                            fontSize: { xs: "0.98rem", md: "1.05rem" },
                            lineHeight: 1.8,
                            maxWidth: 520,
                          }}
                        >
                          {step.body}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks;
