import { useEffect, useState } from "react";
import { Container, Typography, Box, Tab, Tabs } from "@mui/material";
import { useAuth } from "@/context/auth/authContext";
import { useNavigate } from "react-router-dom";
import StudyGroupForm from "@/components/learningHub/StudyGroupForms";
import StudyGroupCarousel from "@/components/profile/StudyGroupCarousel";
import TutorAvailabilityCards from "@/components/learningHub/TutorAvailbilityCards";
import { useStudyGroup } from "@/context/studyGroup/studyGroupContext";

const LearningHub = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { studyGroups, getAllStudyGroups, joinStudyGroup } = useStudyGroup();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate("/");
      } else if (user.role !== "student") {
        navigate("/profile");
      } else {
        getAllStudyGroups();
      }
    }
  }, [user, authLoading, navigate, getAllStudyGroups]);

  const availableStudyGroups = studyGroups.filter(
    (group) =>
      !group.participants.some((participant) => participant._id === user?._id)
  );

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (authLoading || !user) return null;

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 4, md: 8 },
        px: { xs: 2, sm: 3 },
      }}
      role="main"
    >
      <Box sx={{ mb: { xs: 4, md: 5 } }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 900,
            letterSpacing: "-0.04em",
            fontSize: { xs: "clamp(1.75rem, 5vw, 2.25rem)", md: "2.5rem" },
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            background: (t) =>
              `linear-gradient(95deg, ${t.palette.text.primary} 0%, ${t.palette.primary.main} 40%, ${t.palette.primary.light} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Learning Hub
        </Typography>
      </Box>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="learning hub sections"
        sx={{
          mb: 4,
          borderBottom: 1,
          borderColor: "divider",
          "& .MuiTab-root": {
            textTransform: "none",
            fontSize: { xs: "0.9rem", sm: "1rem" },
            fontWeight: 700,
            minWidth: { xs: "auto", sm: 160 },
            px: { xs: 2, sm: 3 },
          },
        }}
      >
        <Tab label="Create Study Group" />
        <Tab label="Available Study Groups" />
        <Tab label="Book Tutor Session" />
      </Tabs>

      <Box role="tabpanel" hidden={activeTab !== 0}>
        {activeTab === 0 && (
          <Box sx={{ maxWidth: "md", mx: "auto" }}>
            <StudyGroupForm />
          </Box>
        )}
      </Box>

      <Box role="tabpanel" hidden={activeTab !== 1}>
        {activeTab === 1 && (
          <StudyGroupCarousel
            user={user}
            availableStudyGroups={availableStudyGroups}
            joinStudyGroup={joinStudyGroup}
            getAllStudyGroups={getAllStudyGroups}
          />
        )}
      </Box>

      <Box role="tabpanel" hidden={activeTab !== 2}>
        {activeTab === 2 && (
          <Box sx={{ maxWidth: "xl", mx: "auto" }}>
            <TutorAvailabilityCards />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default LearningHub;
