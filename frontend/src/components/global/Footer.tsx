import { useEffect, useState } from "react";
import { Box, Typography, Link } from "@mui/material";
import { alpha } from "@mui/material/styles";

const Footer = () => {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "space-evenly",
        gap: { xs: 2, sm: 0 },
        py: 3,
        px: 4,
        mt: "auto",
        borderTop: (t) => `1px solid ${alpha(t.palette.divider, 1)}`,
        bgcolor: (t) => alpha(t.palette.background.paper, 0.5),
        backdropFilter: "blur(16px)",
        color: "text.secondary",
      }}
    >
      <Typography variant="body2" aria-live="polite">
        &copy; {year} Course Correct. All rights reserved.
      </Typography>

      <Typography variant="body2">
        Built by{" "}
        <Link
          href="https://www.ericcapiz.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            fontWeight: 700,
            color: "primary.light",
            textDecoration: "none",
            "&:hover": { color: "primary.main" },
          }}
          aria-label="Visit Eric Capiz's portfolio in a new tab"
        >
          Eric Capiz
        </Link>
      </Typography>

      <Typography
        variant="body2"
        sx={{
          fontStyle: "italic",
          background: (t) =>
            `linear-gradient(90deg, ${t.palette.text.secondary}, ${t.palette.primary.light})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        <em>Learn, Connect, Succeed.</em>
      </Typography>
    </Box>
  );
};

export default Footer;
