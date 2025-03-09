import api from "@/config/axiosConfig";

interface Booking {
  id: string;
  student?: { name: string; email: string };
  tutor?: { name: string; email: string };
  subject: string;
  bookingTime: string;
  duration?: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

interface CreateBookingData {
  tutor: string;
  subject: string;
  bookingTime: string;
  availabilityId: string;
  duration: number;
}

// Create a new tutor booking (Student only)
export const bookTutor = async (
  bookingDetails: CreateBookingData
): Promise<Booking> => {
  try {
    const response = await api.post("/api/bookings", bookingDetails);
    return response.data;
  } catch (error) {
    console.error("Error booking tutor:", error);
    throw error;
  }
};

// Fetch all bookings for a student
export const getStudentBookings = async (): Promise<Booking[]> => {
  try {
    const response = await api.get("/api/bookings/student");
    return response.data;
  } catch (error) {
    console.error("Error fetching student bookings:", error);
    throw error;
  }
};

// Fetch all bookings for a tutor
export const getTutorBookings = async (): Promise<Booking[]> => {
  try {
    const response = await api.get("/api/bookings/tutor");
    return response.data;
  } catch (error) {
    console.error("Error fetching tutor bookings:", error);
    throw error;
  }
};

// Update booking status or reschedule a session
export const updateBooking = async (
  bookingId: string,
  updateData: Partial<Booking>
): Promise<Booking> => {
  try {
    const response = await api.patch(`/api/bookings/${bookingId}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};
