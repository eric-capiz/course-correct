"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { authService } from "../../services/authService";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  subjects: string[];
  gradeLevel: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  signup: (formData: Omit<User, "id"> & { password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const initialToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [token, setToken] = useState<string | null>(initialToken);
  const [user, setUser] = useState<User | null>(null);

  // Memoize verifyToken to ensure it only changes when token changes
  const verifyToken = useCallback(async () => {
    try {
      const userData = await authService.verifyToken(token!);
      setUser(userData);
    } catch (error) {
      console.error("Token verification failed:", error);
      logout();
    }
  }, [token]);

  // Verify token on initial load and whenever the token changes
  useEffect(() => {
    if (token) {
      verifyToken();
    } else {
      setUser(null);
    }
  }, [token, verifyToken]);

  const login = async (credentials: { email: string; password: string }) => {
    const data = await authService.login(credentials);
    localStorage.setItem("token", data.token);
    setToken(data.token);
  };

  const signup = async (formData: Omit<User, "id"> & { password: string }) => {
    const data = await authService.signup(formData);
    localStorage.setItem("token", data.token);
    setToken(data.token);
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export default AuthProvider;
