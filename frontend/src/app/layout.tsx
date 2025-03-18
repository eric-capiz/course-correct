import type { Metadata } from "next";
import AuthProvider from "@/context/auth/ authContext";
import UserProvider from "@/context/users/userContext";
import BookingProvider from "@/context/booking/bookingContext";
import StudyGroupProvider from "@/context/studyGroup/studyGroupContext";
import TutorAvailabilityProvider from "@/context/tutorAvailability/tutorAvailabilityContext";
import Footer from "@/components/global/Footer";
import Navbar from "@/components/global/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Course Correct",
  description: "A platform for course management and study groups",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
                    <main style={{ flex: "1" }}>{children}</main>
                    <Footer />
                  </div>
                </TutorAvailabilityProvider>
              </StudyGroupProvider>
            </BookingProvider>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
