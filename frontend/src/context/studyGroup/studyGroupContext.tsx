"use client";
import { createContext, useContext, useState, useCallback } from "react";
import {
  studyGroupService,
  type StudyGroup,
  type CreateStudyGroupData,
  type UpdateStudyGroupData,
} from "@/services/studyGroup/studyGroup";

interface StudyGroupContextType {
  studyGroups: StudyGroup[];
  loading: boolean;
  error: string | null;
  getAllStudyGroups: () => Promise<void>;
  createStudyGroup: (data: CreateStudyGroupData) => Promise<void>;
  joinStudyGroup: (groupId: string) => Promise<void>;
  leaveStudyGroup: (groupId: string) => Promise<void>;
  updateStudyGroup: (
    groupId: string,
    data: UpdateStudyGroupData
  ) => Promise<void>;
  deleteStudyGroup: (groupId: string) => Promise<void>;
}

const StudyGroupContext = createContext<StudyGroupContextType | undefined>(
  undefined
);

export const StudyGroupProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllStudyGroups = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const groups = await studyGroupService.getAllStudyGroups();
      setStudyGroups(groups);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch study groups"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const createStudyGroup = useCallback(async (data: CreateStudyGroupData) => {
    setLoading(true);
    setError(null);
    try {
      const newGroup = await studyGroupService.createStudyGroup(data);
      setStudyGroups((prev) => [...prev, newGroup]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create study group"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const joinStudyGroup = useCallback(async (groupId: string) => {
    setLoading(true);
    setError(null);
    try {
      const updatedGroup = await studyGroupService.joinStudyGroup(groupId);
      setStudyGroups((prev) =>
        prev.map((group) => (group._id === groupId ? updatedGroup : group))
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to join study group"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const leaveStudyGroup = useCallback(async (groupId: string) => {
    setLoading(true);
    setError(null);
    try {
      const updatedGroup = await studyGroupService.leaveStudyGroup(groupId);
      setStudyGroups((prev) =>
        prev.map((group) => (group._id === groupId ? updatedGroup : group))
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to leave study group"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStudyGroup = useCallback(
    async (groupId: string, data: UpdateStudyGroupData) => {
      setLoading(true);
      setError(null);
      try {
        const updatedGroup = await studyGroupService.updateStudyGroup(
          groupId,
          data
        );
        setStudyGroups((prev) =>
          prev.map((group) => (group._id === groupId ? updatedGroup : group))
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to update study group"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteStudyGroup = useCallback(async (groupId: string) => {
    setLoading(true);
    setError(null);
    try {
      await studyGroupService.deleteStudyGroup(groupId);
      setStudyGroups((prev) => prev.filter((group) => group._id !== groupId));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete study group"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    studyGroups,
    loading,
    error,
    getAllStudyGroups,
    createStudyGroup,
    joinStudyGroup,
    leaveStudyGroup,
    updateStudyGroup,
    deleteStudyGroup,
  };

  return (
    <StudyGroupContext.Provider value={value}>
      {children}
    </StudyGroupContext.Provider>
  );
};

export const useStudyGroup = () => {
  const context = useContext(StudyGroupContext);
  if (context === undefined) {
    throw new Error("useStudyGroup must be used within a StudyGroupProvider");
  }
  return context;
};

export default StudyGroupProvider;
