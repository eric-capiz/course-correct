"use client";

import { createContext, useState, useContext, ReactNode } from "react";
import { userService } from "../../services/user/userService";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  subjects: string[];
  gradeLevel: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  fetchUser: (userId: string) => Promise<void>;
  updateUser: (userId: string, data: Partial<User>) => Promise<void>;
  updatePassword: (
    userId: string,
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data
  const fetchUser = async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await userService.getUser(userId);
      setUser(userData);
    } catch (err) {
      setError(err.message || "Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  // Update user data
  const updateUser = async (userId: string, data: Partial<User>) => {
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await userService.updateUser(userId, data);
      setUser(updatedUser);
    } catch (err) {
      setError(err.message || "Failed to update user data");
    } finally {
      setLoading(false);
    }
  };

  // Update user password
  const updatePassword = async (
    userId: string,
    currentPassword: string,
    newPassword: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      await userService.updatePassword(userId, {
        currentPassword,
        newPassword,
      });
    } catch (err) {
      setError(err.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, loading, error, fetchUser, updateUser, updatePassword }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
