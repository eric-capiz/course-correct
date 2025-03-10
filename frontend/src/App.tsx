import { Routes, Route } from "react-router-dom";
import AuthProvider from "@/context/auth/authContext.tsx";
import UserProvider from "@/context/users/userContext.tsx";
import BookingProvider from "@/context/booking/bookingContext.tsx";
import StudyGroupProvider from "@/context/studyGroup/studyGroupContext.tsx";
import TutorAvailabilityProvider from "@/context/tutorAvailability/tutorAvailabilityContext.tsx";
import Navbar from "@/components/global/Navbar.tsx";
import Footer from "@/components/global/Footer.tsx";
import Home from "./app/page";
import Profile from "./app/profile/page";
import LearningHub from "./app/learning-hub/page";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <BookingProvider>
          <StudyGroupProvider>
            <TutorAvailabilityProvider>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "100vh",
                }}
              >
                <Navbar />
                <main style={{ flex: "1" }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/learning-hub" element={<LearningHub />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </TutorAvailabilityProvider>
          </StudyGroupProvider>
        </BookingProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
