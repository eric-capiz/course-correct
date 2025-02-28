import api from "@/config/axiosConfig";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  subjects: string[];
  gradeLevel: string;
}

interface UpdateUserData {
  email?: string;
  username?: string;
  subjects?: string[];
  gradeLevel?: string;
}

interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const userService = {
  // Fetch user data
  getUser: async (userId: string): Promise<User> => {
    const response = await api.get(`/api/user/${userId}`);
    return response.data;
  },

  // Update user data
  updateUser: async (userId: string, data: UpdateUserData): Promise<User> => {
    const response = await api.put(`/api/user/${userId}`, data);
    return response.data;
  },

  // Update user password
  updatePassword: async (
    userId: string,
    data: UpdatePasswordData
  ): Promise<void> => {
    await api.patch(`/api/user/${userId}/password`, data);
  },
};
