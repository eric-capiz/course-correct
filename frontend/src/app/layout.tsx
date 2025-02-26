import type { Metadata } from "next";
import AppProvider from "@/context/AppContext";
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
        <AppProvider>
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
        </AppProvider>
      </body>
    </html>
  );
}
