import api from "@/config/axiosConfig";

interface User {
  _id: string;
  name: string;
  username: string;
}

interface StudyGroup {
  _id: string;
  title: string;
  subject: string;
  description?: string;
  date: Date;
  time: string;
  duration: number;
  creator: User;
  participants: User[];
  createdAt: string;
  updatedAt: string;
}

interface CreateStudyGroupData {
  title: string;
  subject: string;
  description?: string;
  date: Date;
  time: string;
  duration: number;
}

interface UpdateStudyGroupData {
  subject?: string;
  description?: string;
  date?: Date;
  time?: string;
  duration?: number;
}

interface StudyGroupResponse {
  message: string;
  studyGroup: StudyGroup;
}

export const studyGroupService = {
  // Create a new study group
  createStudyGroup: async (data: CreateStudyGroupData): Promise<StudyGroup> => {
    try {
      const response = await api.post("/api/studyGroups", data);
      return response.data;
    } catch (error) {
      console.error("Error creating study group:", error.message);
      throw error;
    }
  },

  // Get all study groups
  getAllStudyGroups: async (): Promise<StudyGroup[]> => {
    try {
      const response = await api.get("/api/studyGroups");
      return response.data;
    } catch (error) {
      console.error("Error fetching study groups:", error.message);
      throw error;
    }
  },

  // Join a study group
  joinStudyGroup: async (groupId: string): Promise<StudyGroup> => {
    try {
      const response = await api.post<StudyGroupResponse>(
        `/api/studyGroups/${groupId}/join`
      );
      return response.data.studyGroup;
    } catch (error) {
      console.error("Error joining study group:", error.message);
      throw error;
    }
  },

  // Leave a study group
  leaveStudyGroup: async (groupId: string): Promise<StudyGroup> => {
    try {
      const response = await api.post<StudyGroupResponse>(
        `/api/studyGroups/${groupId}/leave`
      );
      return response.data.studyGroup;
    } catch (error) {
      console.error("Error leaving study group:", error.message);
      throw error;
    }
  },

  // Update a study group
  updateStudyGroup: async (
    groupId: string,
    data: UpdateStudyGroupData
  ): Promise<StudyGroup> => {
    try {
      const response = await api.patch<StudyGroupResponse>(
        `/api/studyGroups/${groupId}`,
        data
      );
      return response.data.studyGroup;
    } catch (error) {
      console.error("Error updating study group:", error.message);
      throw error;
    }
  },

  // Delete a study group
  deleteStudyGroup: async (groupId: string): Promise<{ message: string }> => {
    try {
      const response = await api.delete<{ message: string }>(
        `/api/studyGroups/${groupId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting study group:", error.message);
      throw error;
    }
  },
};

export type { StudyGroup, CreateStudyGroupData, UpdateStudyGroupData, User };
