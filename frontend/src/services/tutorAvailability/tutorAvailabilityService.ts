import api from "@/config/axiosConfig";

export interface AvailabilitySlot {
  _id: string;
  tutor: {
    _id: string;
    name: string;
    subjects: string[];
    gradeLevel: string;
  };
  day: string;
  subject: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface UpdateAvailabilityData {
  subject?: string;
  startTime?: string;
  endTime?: string;
  isActive?: boolean;
}

// Add new availability slots
export const addAvailability = async (
  availability: Omit<AvailabilitySlot, "_id" | "tutor">[]
): Promise<{ message: string }> => {
  try {
    const response = await api.post("/api/tutors/availability", {
      availability,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding availability:", error);
    throw error;
  }
};

// Get tutor's availability
export const getAvailability = async (): Promise<AvailabilitySlot[]> => {
  try {
    const response = await api.get("/api/tutors/availability");
    return response.data;
  } catch (error) {
    console.error("Error fetching availability:", error);
    throw error;
  }
};

// Update availability slot
export const updateAvailability = async (
  id: string,
  updates: UpdateAvailabilityData
): Promise<AvailabilitySlot> => {
  try {
    const response = await api.patch(`/api/tutors/availability/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error("Error updating availability:", error);
    throw error;
  }
};

// Delete availability slot
export const deleteAvailability = async (
  id: string
): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/api/tutors/availability/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting availability:", error);
    throw error;
  }
};

// Get all tutors' availability (for students)
export const getAllTutorsAvailability = async (): Promise<
  AvailabilitySlot[]
> => {
  try {
    const response = await api.get("/api/tutors/availability/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching all tutors availability:", error);
    throw error;
  }
};
