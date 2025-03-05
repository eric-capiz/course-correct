"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Link } from "@mui/material";

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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        py: 3,
        px: 4,
        mt: 4,
        borderTop: "1px solid #CBD5E1",
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
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
            textDecoration: "none",
            fontWeight: 500,
            color: "var(--primary-color)",
          }}
          aria-label="Visit Eric Capiz's portfolio in a new tab"
        >
          Eric Capiz
        </Link>
      </Typography>

      <Typography
        variant="body2"
        sx={{ fontStyle: "italic", color: "var(--secondary-color)" }}
      >
        <em>Learn, Connect, Succeed.</em>
      </Typography>
    </Box>
  );
};

export default Footer;
