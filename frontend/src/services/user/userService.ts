import api from "@/config/axiosConfig";

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  subjects: string[];
  gradeLevel: string;
}

interface UpdateUserData {
  name?: string;
  username?: string;
  email?: string;
  role?: string;
  subjects?: string[];
  gradeLevel?: string;
  password?: string;
}

export const userService = {
  // Fetch user data
  getUser: async (userId: string): Promise<User> => {
    try {
      const response = await api.get(`/api/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  },

  // Update user data (including optional password)
  updateUser: async (userId: string, data: UpdateUserData): Promise<User> => {
    const response = await api.put(`/api/users/${userId}`, data);
    return response.data;
  },
};
