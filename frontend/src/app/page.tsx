import { Box } from "@mui/material";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Features from "@/components/home/Features";
import { homePalette } from "@/components/home/homePalette";
import "./homeLanding.css";

export default function Home() {
  return (
    <Box
      id="home-page"
      sx={{
        bgcolor: homePalette.void,
        overflow: "hidden",
      }}
    >
      <Hero />
      <HowItWorks />
      <Features />
    </Box>
  );
}
