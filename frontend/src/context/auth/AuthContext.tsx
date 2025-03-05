"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { authService } from "../../services/auth/authService";

interface User {
  _id: string;
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
  loading: boolean;
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
  const [loading, setLoading] = useState(true); // Add loading state

  // Memoize verifyToken to ensure it only changes when token changes
  const verifyToken = useCallback(async () => {
    try {
      if (token) {
        const userData = await authService.verifyToken(token);
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      logout();
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Verify token on initial load and whenever the token changes
  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  const login = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    try {
      const data = await authService.login(credentials);
      localStorage.setItem("token", data.token);
      setToken(data.token);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (formData: Omit<User, "id"> & { password: string }) => {
    setLoading(true);
    try {
      const data = await authService.signup(formData);
      localStorage.setItem("token", data.token);
      setToken(data.token);
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, signup, logout }}
    >
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
