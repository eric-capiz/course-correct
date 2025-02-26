"use client";

import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        py: 3,
        px: 4,
        mt: 4,
        borderTop: "1px solid #CBD5E1",
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Course Correct. All rights reserved.
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
        >
          Eric Capiz
        </Link>
      </Typography>
      <Typography
        variant="body2"
        sx={{ fontStyle: "italic", color: "var(--secondary-color)" }}
      >
        Learn, Connect, Succeed.
      </Typography>
    </Box>
  );
};

export default Footer;
