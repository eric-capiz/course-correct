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

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData extends Omit<User, "id"> {
  password: string;
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await api.post("/api/auth/login", credentials);
    return data;
  },

  signup: async (formData: SignupData) => {
    const { data } = await api.post("/api/auth/register", formData);
    return data;
  },

  verifyToken: async (token: string) => {
    const { data } = await api.get("/api/auth/verify", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};
