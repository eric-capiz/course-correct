"use client";

import { createContext, useState, useContext, useEffect } from "react";
import {
  getStudentBookings,
  getTutorBookings,
  bookTutor,
  updateBooking,
} from "@/services/booking/booking";
import { useAuth } from "@/context/auth/AuthContext";

interface Booking {
  id: string;
  student?: { name: string; email: string };
  tutor?: { name: string; email: string };
  subject: string;
  bookingTime: string;
  duration?: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

interface BookingContextType {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  fetchBookings: () => Promise<void>;
  bookSession: (
    tutorId: string,
    subject: string,
    bookingTime: string
  ) => Promise<void>;
  updateSession: (
    bookingId: string,
    updateData: Partial<Booking>
  ) => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data =
        user.role === "student"
          ? await getStudentBookings()
          : await getTutorBookings();
      setBookings(data);
    } catch (err) {
      setError("Failed to fetch bookings");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const bookSession = async (
    tutorId: string,
    subject: string,
    bookingTime: string
  ) => {
    if (!user || user.role !== "student") {
      setError("Only students can book tutor sessions.");
      return;
    }
    setLoading(true);
    try {
      await bookTutor(tutorId, subject, bookingTime);
      await fetchBookings();
    } catch (err) {
      setError("Failed to book session");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateSession = async (
    bookingId: string,
    status: "confirmed" | "completed" | "cancelled"
  ) => {
    if (!user) return;

    // Tutors can only mark sessions as confirmed or completed
    if (user.role === "tutor" && !["confirmed", "completed"].includes(status)) {
      setError("Tutors can only confirm or complete sessions.");
      return;
    }

    // Students can only cancel their own sessions
    if (user.role === "student" && status !== "cancelled") {
      setError("Students can only cancel sessions.");
      return;
    }

    setLoading(true);
    try {
      await updateBooking(bookingId, { status });
      await fetchBookings();
    } catch (err) {
      setError("Failed to update session status.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        loading,
        error,
        fetchBookings,
        bookSession,
        updateSession,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};

export default BookingProvider;
