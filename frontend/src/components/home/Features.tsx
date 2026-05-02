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
    span: "large" as const,
    area: "a" as const,
    bloom: homePalette.bloom,
  },
  {
    icon: Group,
    title: "Student-Led Study Groups",
    body: "Create and join study groups based on your grade level and subject.",
    span: "small" as const,
    area: "b" as const,
    bloom: homePalette.violet,
  },
  {
    icon: VolunteerActivism,
    title: "Volunteer-Based Tutoring",
    body: "Tutors volunteer their time and set their expertise level for students to book them.",
    span: "small" as const,
    area: "c" as const,
    bloom: homePalette.rose,
  },
  {
    icon: School,
    title: "Seamless Scheduling",
    body: "Use the built-in calendar to track upcoming tutoring sessions easily.",
    span: "wide" as const,
    area: "d" as const,
    bloom: homePalette.gold,
  },
];

const Features = () => {
  return (
    <Box
      component="section"
      aria-labelledby="home-features-heading"
      sx={{
        position: "relative",
        bgcolor: homePalette.voidDeep,
        py: { xs: 10, md: 14 },
        overflow: "hidden",
      }}
    >
      <Box className="home-aurora" sx={{ opacity: 0.55 }} aria-hidden />
      <Box className="home-starfield" sx={{ opacity: 0.35 }} aria-hidden />
      <Box className="home-grain" aria-hidden />

      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: { xs: "left", md: "center" }, mb: { xs: 6, md: 9 } }}>
          <Typography
            id="home-features-heading"
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
            Platform Features
          </Typography>
          <Box className="home-rail-shimmer" sx={{ width: { xs: 240, sm: 360 }, height: 3, mx: { md: "auto" } }} />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
            gap: { xs: 2.5, md: 3 },
            gridTemplateAreas: {
              xs: `
                "a"
                "b"
                "c"
                "d"
              `,
              md: `
                "a a a a a a b b b b b b"
                "a a a a a a c c c c c c"
                "d d d d d d d d d d d d"
              `,
            },
            perspective: { md: "1600px" },
          }}
        >
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Box
                key={item.title}
                className="home-holo-frame"
                sx={{
                  gridArea: item.area,
                  position: "relative",
                  borderRadius: 4,
                  p: { xs: 2.75, md: 3.75 },
                  overflow: "hidden",
                  display: "flex",
                  flexDirection:
                    item.span === "wide" ? { xs: "column", sm: "row" } : "column",
                  alignItems: item.span === "wide" ? { sm: "flex-start" } : "flex-start",
                  gap: item.span === "wide" ? { xs: 2.5, sm: 3.5 } : 0,
                  bgcolor: homePalette.glass,
                  backdropFilter: "blur(22px) saturate(160%)",
                  WebkitBackdropFilter: "blur(22px) saturate(160%)",
                  border: `1px solid ${homePalette.line}`,
                  boxShadow: `
                    inset 0 1px 0 rgba(255,255,255,0.1),
                    0 24px 80px rgba(0,0,0,0.55),
                    0 0 80px ${item.bloom}12
                  `,
                  transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.45s ease",
                  transformStyle: "preserve-3d",
                  "&:hover": {
                    transform: {
                      md: "translateY(-10px) rotateX(4deg) rotateY(-3deg) translateZ(12px)",
                    },
                    boxShadow: `
                      inset 0 1px 0 rgba(255,255,255,0.14),
                      0 40px 120px rgba(0,0,0,0.6),
                      0 0 100px ${item.bloom}28
                    `,
                  },
                }}
              >
                <Box
                  aria-hidden
                  sx={{
                    position: "absolute",
                    top: -80,
                    right: -60,
                    width: 220,
                    height: 220,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${item.bloom}35 0%, transparent 65%)`,
                    filter: "blur(4px)",
                    opacity: 0.9,
                    pointerEvents: "none",
                  }}
                />

                <Box
                  sx={{
                    flexShrink: 0,
                    width: item.span === "wide" ? 64 : 56,
                    height: item.span === "wide" ? 64 : 56,
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    zIndex: 1,
                    color: homePalette.chrome,
                    mb: item.span === "wide" ? { xs: 0, sm: 0 } : 2.5,
                    background: `linear-gradient(145deg, ${item.bloom}55, rgba(0,0,0,0.35))`,
                    border: `1px solid rgba(255,255,255,0.15)`,
                    boxShadow: `0 0 50px ${item.bloom}35, inset 0 1px 0 rgba(255,255,255,0.15)`,
                  }}
                >
                  <Icon sx={{ fontSize: item.span === "large" ? 36 : 30 }} />
                </Box>
                <Box sx={{ flex: 1, position: "relative", zIndex: 1 }}>
                  <Typography
                    component="h3"
                    sx={{
                      fontWeight: 900,
                      letterSpacing: "-0.03em",
                      fontSize:
                        item.span === "large"
                          ? { xs: "1.4rem", md: "1.65rem" }
                          : { xs: "1.15rem", md: "1.28rem" },
                      color: homePalette.chrome,
                      mb: 1.25,
                      lineHeight: 1.2,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: homePalette.muted,
                      fontSize: "0.97rem",
                      lineHeight: 1.8,
                      maxWidth: item.span === "large" ? 440 : "none",
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
