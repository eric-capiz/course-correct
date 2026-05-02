import { useState, useCallback, type MouseEvent } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useAuth } from "@/context/auth/authContext";
import { homePalette } from "./homePalette";

const Hero = () => {
  const { loading } = useAuth();
  const [glow, setGlow] = useState({ x: 50, y: 45 });

  const onHeroMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    setGlow({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  }, []);

  const onHeroLeave = useCallback(() => {
    setGlow({ x: 50, y: 45 });
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: { xs: "75vh", md: "92vh" },
          bgcolor: homePalette.voidDeep,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box className="home-aurora" sx={{ position: "absolute", inset: 0 }} aria-hidden />
        <Box className="home-starfield" sx={{ position: "absolute", inset: 0 }} aria-hidden />
        <CircularProgress
          size={56}
          thickness={3}
          sx={{
            color: homePalette.bloom,
            filter: "drop-shadow(0 0 18px rgba(34,211,238,0.55))",
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      component="section"
      aria-labelledby="home-hero-heading"
      onMouseMove={onHeroMove}
      onMouseLeave={onHeroLeave}
      sx={{
        bgcolor: homePalette.voidDeep,
        position: "relative",
        overflow: "hidden",
        minHeight: { xs: "100vh", md: "min(100vh, 960px)" },
        display: "flex",
        alignItems: "center",
        py: { xs: 6, md: 0 },
      }}
    >
      <Box className="home-aurora" aria-hidden />
      <Box className="home-starfield" aria-hidden />
      <Box className="home-grid-3d" aria-hidden>
        <Box className="home-grid-3d-inner" />
      </Box>
      <Box className="home-grain" aria-hidden />
      <Box className="home-scan" aria-hidden />

      {/* Interactive spotlight */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(
            min(900px, 120vw) circle at ${glow.x}% ${glow.y}%,
            rgba(34, 211, 238, 0.14) 0%,
            rgba(167, 139, 250, 0.06) 35%,
            transparent 55%
          )`,
          transition: "background 0.15s ease-out",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 1320,
          mx: "auto",
          px: { xs: 2.5, sm: 4 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.12fr) minmax(280px, 0.55fr)" },
          gap: { xs: 5, lg: 4 },
          alignItems: "center",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Typography
            sx={{
              position: "absolute",
              top: { xs: -40, md: -56 },
              left: { xs: -8, md: -24 },
              fontSize: { xs: "clamp(4rem, 22vw, 7rem)", md: "clamp(5rem, 12vw, 9rem)" },
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.06em",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.07)",
              pointerEvents: "none",
              userSelect: "none",
              zIndex: 0,
            }}
            aria-hidden
          >
            CC
          </Typography>

          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Box sx={{ mb: { xs: 2.5, md: 3 } }}>
              <Box className="home-rail-shimmer" sx={{ width: { xs: "100%", sm: 280 }, maxWidth: "100%" }} />
            </Box>

            <Typography
              id="home-hero-heading"
              variant="h1"
              className="home-chrome-text"
              sx={{
                fontWeight: 900,
                fontSize: {
                  xs: "clamp(2.35rem, 8vw, 3.45rem)",
                  md: "clamp(3.1rem, 4.6vw, 4.6rem)",
                },
                lineHeight: 1.02,
                letterSpacing: "-0.045em",
                mb: { xs: 3, md: 4 },
                maxWidth: 920,
              }}
            >
              Find Tutors. Join Study Groups. Succeed Together.
            </Typography>

            <Box className="home-holo-frame" sx={{ maxWidth: 600, borderRadius: 3, mb: 3 }}>
              <Box
                sx={{
                  p: { xs: 2.5, md: 3.5 },
                  borderRadius: 3,
                  bgcolor: homePalette.glass,
                  backdropFilter: "blur(24px) saturate(160%)",
                  WebkitBackdropFilter: "blur(24px) saturate(160%)",
                  border: `1px solid ${homePalette.line}`,
                  boxShadow: `
                    inset 0 1px 0 rgba(255,255,255,0.12),
                    0 32px 100px rgba(0,0,0,0.55)
                  `,
                }}
              >
                <Typography
                  sx={{
                    color: homePalette.muted,
                    fontSize: { xs: "1.05rem", md: "1.22rem" },
                    lineHeight: 1.75,
                    fontWeight: 400,
                  }}
                >
                  Course Correct is your all-in-one platform to collaborate, form study groups, and
                  book tutoring sessions seamlessly.
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 1.25,
                flexWrap: "wrap",
                alignItems: "center",
              }}
              aria-hidden
            >
              {[homePalette.bloom, homePalette.violet, homePalette.rose, homePalette.gold, homePalette.mint].map(
                (c, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: c,
                      boxShadow: `0 0 18px ${c}88`,
                      opacity: 0.85,
                    }}
                  />
                ),
              )}
            </Box>
          </Box>
        </Box>

        {/* Right column — pure spectacle */}
        <Box
          sx={{
            position: "relative",
            minHeight: { xs: 280, md: 420 },
            display: { xs: "none", lg: "block" },
          }}
          aria-hidden
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 420,
              height: 420,
              marginTop: "-210px",
              marginLeft: "-210px",
            }}
          >
            <Box className="home-orbit-ring" sx={{ inset: 0 }} />
            <Box
              className="home-orbit-ring"
              sx={{
                inset: 36,
                animationDuration: "38s",
                opacity: 0.5,
              }}
            />
          </Box>

          <Box
            sx={{
              position: "absolute",
              top: "12%",
              right: "4%",
              width: "58%",
              height: 110,
              borderRadius: 3,
              bgcolor: homePalette.glass,
              backdropFilter: "blur(20px)",
              border: `1px solid ${homePalette.line}`,
              transform: "rotate(-6deg)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "38%",
              right: "18%",
              width: "62%",
              height: 130,
              borderRadius: 3,
              background: `linear-gradient(135deg, rgba(167,139,250,0.2), rgba(34,211,238,0.12))`,
              backdropFilter: "blur(16px)",
              border: `1px solid rgba(255,255,255,0.12)`,
              transform: "rotate(4deg)",
              boxShadow: "0 28px 90px rgba(12,8,36,0.6)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "8%",
              right: "10%",
              width: "54%",
              height: 100,
              borderRadius: 3,
              bgcolor: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(12px)",
              border: `1px solid ${homePalette.line}`,
              transform: "rotate(-3deg)",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              bottom: "22%",
              left: "6%",
              width: 120,
              height: 120,
              borderRadius: 3,
              background: `conic-gradient(from 210deg, ${homePalette.bloom}, ${homePalette.violet}, ${homePalette.rose}, ${homePalette.gold}, ${homePalette.bloom})`,
              opacity: 0.35,
              filter: "blur(1px)",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
