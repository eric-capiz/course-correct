import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import AuthProvider from "@/context/auth/authContext";
import UserProvider from "@/context/users/userContext";
import BookingProvider from "@/context/booking/bookingContext";
import StudyGroupProvider from "@/context/studyGroup/studyGroupContext";
import TutorAvailabilityProvider from "@/context/tutorAvailability/tutorAvailabilityContext";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import Home from "./page";
import Profile from "./profile/page";
import LearningHub from "./learning-hub/page";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <BookingProvider>
          <StudyGroupProvider>
            <TutorAvailabilityProvider>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "100vh",
                  bgcolor: "background.default",
                }}
              >
                <Navbar />
                <Box component="main" className="app-main-canvas" sx={{ flex: 1 }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/learning-hub" element={<LearningHub />} />
                  </Routes>
                </Box>
                <Footer />
              </Box>
            </TutorAvailabilityProvider>
          </StudyGroupProvider>
        </BookingProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
