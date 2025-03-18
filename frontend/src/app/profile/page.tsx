import { useEffect, useCallback, useMemo } from "react";
import { useAuth } from "@/context/auth/ authContext";
import { useUser } from "@/context/users/userContext";
import { useNavigate } from "react-router-dom";
import { useBooking } from "@/context/booking/bookingContext";
import { useStudyGroup } from "@/context/studyGroup/studyGroupContext";
import EditProfileDialog from "@/components/modals/EditProfile";
import { Container, Box } from "@mui/material";
import ProfileDetails from "@/components/profile/ProfileDetails";
import StudyGroups from "@/components/profile/StudyGroups";
import TutorAvailability from "@/components/profile/TutorAvailability";
import TutorSessions from "@/components/profile/TutorSessions";
import { useState } from "react";

const Profile = () => {
  const { user: authUser, loading: authLoading } = useAuth();
  const { user, fetchUser, updateUser } = useUser();
  const { bookings, updateSession } = useBooking();
  const { studyGroups, getAllStudyGroups, leaveStudyGroup, deleteStudyGroup } =
    useStudyGroup();
  const navigate = useNavigate();
  const [openEditDialog, setOpenEditDialog] = useState(false);

  // Memoize the fetch operations
  const fetchData = useCallback(
    async (userId: string) => {
      try {
        await Promise.all([fetchUser(userId), getAllStudyGroups()]);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    },
    [fetchUser, getAllStudyGroups]
  );

  // Auth check and data fetching
  useEffect(() => {
    if (!authLoading && authUser === null) {
      navigate("/");
    } else if (authUser?._id) {
      fetchData(authUser._id);
    }
  }, [authUser, authLoading, navigate, fetchData]);

  // Memoize user's study groups
  const userStudyGroups = useMemo(() => {
    if (!user?._id || !studyGroups.length) return [];
    return studyGroups.filter((group) =>
      group.participants.some((participant) => participant._id === user._id)
    );
  }, [user?._id, studyGroups]);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }} role="main">
      {/* First row with two columns */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, mb: 4 }}>
        <ProfileDetails
          user={user}
          onEditClick={() => setOpenEditDialog(true)}
        />

        {/* Study Groups & Tutor Sessions Column */}
        <Box sx={{ flex: "1 1 65%" }}>
          <StudyGroups
            user={user}
            userStudyGroups={userStudyGroups}
            leaveStudyGroup={leaveStudyGroup}
            deleteStudyGroup={deleteStudyGroup}
            getAllStudyGroups={getAllStudyGroups}
          />

          <TutorAvailability user={user} />

          <TutorSessions
            user={user}
            bookings={bookings}
            updateSession={updateSession}
          />
        </Box>
      </Box>
      <EditProfileDialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        user={user}
        updateUser={updateUser}
      />
    </Container>
  );
};

export default Profile;
