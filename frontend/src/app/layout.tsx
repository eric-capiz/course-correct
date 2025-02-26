import type { Metadata } from "next";
import "./globals.css";
import AppProvider from "@/context/AppContext";
import Footer from "@/components/Footer";
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
            <main style={{ flex: "1" }}>{children}</main>
            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
