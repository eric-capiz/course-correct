"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import {
  AvailabilitySlot,
  addAvailability as addAvailabilityService,
  getAvailability as getAvailabilityService,
  updateAvailability as updateAvailabilityService,
  deleteAvailability as deleteAvailabilityService,
} from "@/services/tutorAvailability/tutorAvailabilityService";

interface TutorAvailabilityContextType {
  availability: AvailabilitySlot[];
  loading: boolean;
  error: string | null;
  addAvailability: (
    slots: Omit<AvailabilitySlot, "_id" | "tutor">[]
  ) => Promise<void>;
  getAvailability: () => Promise<void>;
  updateAvailability: (
    id: string,
    updates: {
      subject?: string;
      startTime?: string;
      endTime?: string;
      disableDay?: boolean;
      isActive?: boolean;
    }
  ) => Promise<void>;
  deleteAvailability: (id: string) => Promise<void>;
}

const TutorAvailabilityContext = createContext<
  TutorAvailabilityContextType | undefined
>(undefined);

export const TutorAvailabilityProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addAvailability = async (
    slots: Omit<AvailabilitySlot, "_id" | "tutor">[]
  ) => {
    setLoading(true);
    setError(null);
    try {
      await addAvailabilityService(slots);
      const newData = await getAvailabilityService();

      setAvailability(newData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAvailability = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAvailabilityService();
      setAvailability(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAvailability = async (
    id: string,
    updates: {
      subject?: string;
      startTime?: string;
      endTime?: string;
      disableDay?: boolean;
      isActive?: boolean;
    }
  ) => {
    setLoading(true);
    setError(null);
    try {
      await updateAvailabilityService(id, updates);
      await getAvailability(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAvailability = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteAvailabilityService(id);
      setAvailability((prev) => prev.filter((slot) => slot._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <TutorAvailabilityContext.Provider
      value={{
        availability,
        loading,
        error,
        addAvailability,
        getAvailability,
        updateAvailability,
        deleteAvailability,
      }}
    >
      {children}
    </TutorAvailabilityContext.Provider>
  );
};

export const useTutorAvailability = () => {
  const context = useContext(TutorAvailabilityContext);
  if (context === undefined) {
    throw new Error(
      "useTutorAvailability must be used within a TutorAvailabilityProvider"
    );
  }
  return context;
};

export default TutorAvailabilityProvider;
