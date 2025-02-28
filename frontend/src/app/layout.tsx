import type { Metadata } from "next";
import AuthProvider from "@/context/auth/AuthContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
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
        </AuthProvider>
      </body>
    </html>
  );
}
