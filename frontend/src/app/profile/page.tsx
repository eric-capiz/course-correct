"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useAuth } from "@/context/auth/authContext";
import { useUser } from "@/context/users/userContext";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/booking/bookingContext";
import { useStudyGroup } from "@/context/studyGroup/studyGroupContext";
import EditProfileDialog from "@/components/modals/EditProfile";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
  Button,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";
import {
  AccountCircle,
  AlternateEmail,
  Email,
  School,
  Class,
  Badge,
  Edit,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

const Profile = () => {
  const { user: authUser, loading: authLoading } = useAuth();
  const { user, fetchUser, updateUser } = useUser();
  const { bookings, updateSession } = useBooking();
  const {
    studyGroups,
    getAllStudyGroups,
    leaveStudyGroup,
    joinStudyGroup,
    deleteStudyGroup,
  } = useStudyGroup();
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

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
      router.push("/");
    } else if (authUser?._id) {
      fetchData(authUser._id);
    }
  }, [authUser, authLoading, router, fetchData]);

  // Memoize filtered bookings
  const { pendingBookings, upcomingBookings, pastBookings } = useMemo(
    () => ({
      pendingBookings: bookings.filter(
        (b) => b.extendedProps.status === "pending"
      ),
      upcomingBookings: bookings.filter(
        (b) => b.extendedProps.status === "confirmed"
      ),
      pastBookings: bookings.filter((b) =>
        ["completed", "cancelled"].includes(b.extendedProps.status)
      ),
    }),
    [bookings]
  );

  // Memoize user's study groups
  const userStudyGroups = useMemo(() => {
    if (!user?._id || !studyGroups.length) return [];
    return studyGroups.filter((group) =>
      group.participants.some((participant) => participant._id === user._id)
    );
  }, [user?._id, studyGroups]);

  // Add this with your other memoized values
  const availableStudyGroups = useMemo(() => {
    if (!user?._id || !studyGroups.length) return [];
    return studyGroups.filter(
      (group) =>
        !group.participants.some((participant) => participant._id === user._id)
    );
  }, [user?._id, studyGroups]);

  const scrollCarousel = (direction: "left" | "right") => {
    setCurrentCardIndex((prevIndex) => {
      if (direction === "left") {
        return prevIndex === 0
          ? availableStudyGroups.length - 1
          : prevIndex - 1;
      } else {
        return prevIndex === availableStudyGroups.length - 1
          ? 0
          : prevIndex + 1;
      }
    });
  };

  const StudyGroupActions = ({ group, position = null }) => {
    // Move the debug logs to useEffect to ensure they run
    useEffect(() => {
      console.log("=== Study Group Action Debug ===");
      console.log("Group Title:", group.title);
      console.log("Group Creator:", group.creator);
      console.log("Current User:", user);
      console.log("Participants:", group.participants);
      console.log("Participant Count:", group.participants.length);
      console.log("Is Current User Creator?:", group.creator._id === user?._id);
      console.log("=== End Debug ===");
    }, [group, user]);

    // Add immediate console log
    console.log("StudyGroupActions Rendering:", {
      groupTitle: group.title,
      creatorId: group.creator._id,
      userId: user?._id,
      participantsCount: group.participants.length,
    });

    const isCreator = group.creator._id === user?._id;
    const hasOnlyCreator =
      group.participants.length === 1 &&
      group.participants[0]._id === user?._id;

    // Add debug log for conditions
    console.log("Conditions:", { isCreator, hasOnlyCreator });

    if (isCreator && hasOnlyCreator) {
      console.log("Should show delete button for:", group.title);
      return (
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            size="large"
            onClick={async () => {
              try {
                await deleteStudyGroup(group._id);
                getAllStudyGroups();
              } catch (error) {
                console.error("Error deleting study group:", error);
              }
            }}
            disabled={position !== null && position !== 0}
            aria-label={`Delete ${group.title} study group`}
            sx={{ py: 1.5 }}
          >
            Delete Group
          </Button>
        </Box>
      );
    }

    console.log("Showing join button for:", group.title);
    return (
      <Button
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        onClick={async () => {
          try {
            await joinStudyGroup(group._id);
            getAllStudyGroups();
          } catch (error) {
            console.error("Error joining study group:", error);
          }
        }}
        disabled={position !== null && position !== 0}
        aria-label={`Join ${group.title} study group`}
        sx={{ py: 1.5 }}
      >
        Join Group
      </Button>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }} role="main">
      {/* First row with two columns */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, mb: 4 }}>
        {/* Profile Details Column */}
        <Box
          sx={{
            flex: "1 1 30%",
            borderRight: { md: "1px solid #ddd" },
            pr: { md: 3 },
            p: 3,
            borderRadius: "8px",
            backgroundColor: "#f9fafb",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
          aria-labelledby="profile-details"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              gap: 1,
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              color="primary"
              id="profile-details"
            >
              Profile Details
            </Typography>
            <Tooltip title="Edit Profile">
              <IconButton
                onClick={() => setOpenEditDialog(true)}
                aria-label="edit profile"
                sx={{
                  color: "var(--primary-color)",
                  "&:hover": {
                    backgroundColor: "rgba(30, 58, 138, 0.04)",
                  },
                  "&:focus-visible": {
                    outline: "2px solid var(--primary-color)",
                    outlineOffset: "2px",
                  },
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AccountCircle sx={{ color: "var(--primary-color)" }} />
              <Typography>
                <b>Name:</b> {user?.name}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AlternateEmail sx={{ color: "var(--primary-color)" }} />
              <Typography>
                <b>Username:</b> {user?.username}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Email sx={{ color: "var(--primary-color)" }} />
              <Typography>
                <b>Email:</b> {user?.email}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Badge sx={{ color: "var(--primary-color)" }} />
              <Typography>
                <b>Role:</b> {user?.role}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <School sx={{ color: "var(--primary-color)" }} />
              <Typography>
                <b>Grade Level:</b> {user?.gradeLevel}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Class sx={{ color: "var(--primary-color)" }} />
              <Typography>
                <b>Subjects:</b> {user?.subjects.join(", ")}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Study Groups & Tutor Sessions Column */}
        <Box sx={{ flex: "1 1 65%" }}>
          {/* Student-Specific Section: Study Groups */}
          {user?.role === "student" && (
            <>
              <Typography
                variant="h5"
                fontWeight={700}
                mb={2}
                id="study-groups"
              >
                Study Groups ({userStudyGroups.length})
              </Typography>
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  {userStudyGroups.length > 0 ? (
                    <Box sx={{ display: "grid", gap: 3 }}>
                      {userStudyGroups.map((group) => (
                        <Card
                          key={group._id}
                          sx={{
                            p: { xs: 2, sm: 3 },
                            borderLeft: "4px solid var(--primary-color)",
                            "&:hover": {
                              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                              transform: "translateY(-2px)",
                            },
                            transition: "all 0.2s ease-in-out",
                          }}
                          role="article"
                          aria-labelledby={`group-title-${group._id}`}
                        >
                          <Box sx={{ mb: 2 }}>
                            <Typography
                              variant="h6"
                              id={`group-title-${group._id}`}
                              color="primary"
                              gutterBottom
                            >
                              {group.title}
                            </Typography>
                            {group.description && (
                              <Typography
                                color="text.secondary"
                                sx={{ mb: 2 }}
                                component="p"
                              >
                                {group.description}
                              </Typography>
                            )}
                          </Box>

                          <Box
                            sx={{
                              display: "grid",
                              gap: 2,
                              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                              mb: 3,
                            }}
                          >
                            <Box>
                              <Typography
                                variant="subtitle2"
                                color="text.secondary"
                              >
                                Subject
                              </Typography>
                              <Typography>{group.subject}</Typography>
                            </Box>
                            <Box>
                              <Typography
                                variant="subtitle2"
                                color="text.secondary"
                              >
                                Date & Time
                              </Typography>
                              <Typography>
                                {new Date(group.date).toLocaleDateString()} at{" "}
                                {group.time}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography
                                variant="subtitle2"
                                color="text.secondary"
                              >
                                Duration
                              </Typography>
                              <Typography>{group.duration} minutes</Typography>
                            </Box>
                            <Box>
                              <Typography
                                variant="subtitle2"
                                color="text.secondary"
                              >
                                Created by
                              </Typography>
                              <Typography>{group.creator.name}</Typography>
                            </Box>
                          </Box>

                          <Box sx={{ mt: 2 }}>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                              gutterBottom
                            >
                              Participants ({group.participants.length})
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                                alignItems: "center",
                              }}
                            >
                              {group.participants.map((participant) => (
                                <Chip
                                  key={participant._id}
                                  label={participant.name}
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    borderRadius: "4px",
                                    backgroundColor:
                                      participant._id === group.creator._id
                                        ? "rgba(25, 118, 210, 0.08)"
                                        : "transparent",
                                  }}
                                />
                              ))}
                            </Box>
                          </Box>

                          {/* Action buttons */}
                          <Box
                            sx={{
                              mt: 3,
                              display: "flex",
                              justifyContent: "flex-end",
                              gap: 2,
                            }}
                          >
                            {group.creator._id === user?._id &&
                            group.participants.length === 1 ? (
                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={async () => {
                                  try {
                                    await deleteStudyGroup(group._id);
                                    getAllStudyGroups();
                                  } catch (error) {
                                    console.error(
                                      "Error deleting study group:",
                                      error
                                    );
                                  }
                                }}
                                aria-label={`Delete ${group.title} study group`}
                              >
                                Delete Group
                              </Button>
                            ) : (
                              group.creator._id !== user?._id && (
                                <Button
                                  variant="outlined"
                                  color="error"
                                  size="small"
                                  onClick={async () => {
                                    try {
                                      await leaveStudyGroup(group._id);
                                      getAllStudyGroups();
                                    } catch (error) {
                                      console.error(
                                        "Error leaving study group:",
                                        error
                                      );
                                    }
                                  }}
                                  aria-label={`Leave ${group.title} study group`}
                                >
                                  Leave Group
                                </Button>
                              )
                            )}
                          </Box>
                        </Card>
                      ))}
                    </Box>
                  ) : (
                    <Typography>No study groups joined yet.</Typography>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {/* Tutor-Specific Section: Availability */}
          {user?.role === "tutor" && (
            <>
              <Typography
                variant="h5"
                fontWeight={700}
                mt={6}
                mb={2}
                id="availability"
              >
                Your Availability
              </Typography>
              <Card sx={{ mb: 12 }}>
                <CardContent>
                  <Typography>
                    Weekly availability will be displayed here.
                  </Typography>
                </CardContent>
              </Card>
            </>
          )}

          {/* Shared Section: Tutor Sessions */}
          <Typography variant="h5" fontWeight={700} mb={2} id="tutor-sessions">
            Tutor Sessions ({bookings?.length || 0})
          </Typography>
          <Tabs
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              padding: "4px",
              "& .MuiTab-root": {
                flex: 1,
                textTransform: "none",
                fontSize: "14px",
                fontWeight: "600",
                color: "#555",
                padding: "10px",
                "&.Mui-selected": {
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  borderRadius: "6px",
                },
              },
              "& .MuiTabs-indicator": {
                display: "none",
              },
            }}
            aria-label="Tutor Sessions Navigation"
          >
            <Tab label={`Pending (${pendingBookings.length})`} tabIndex={0} />
            <Tab label={`Upcoming (${upcomingBookings.length})`} tabIndex={0} />
            <Tab label={`Past (${pastBookings.length})`} tabIndex={0} />
          </Tabs>

          <Card sx={{ mt: 2 }}>
            <CardContent>
              {[pendingBookings, upcomingBookings, pastBookings][tab]
                ?.length === 0 ? (
                <Typography>No sessions available.</Typography>
              ) : (
                <Box sx={{ display: "grid", gap: 2 }}>
                  {[pendingBookings, upcomingBookings, pastBookings][tab].map(
                    (booking) => (
                      <Card
                        key={booking.id}
                        sx={{
                          p: 2,
                          borderLeft: "5px solid",
                          borderColor: "#1976d2",
                        }}
                        tabIndex={0}
                        role="article"
                        aria-labelledby={`booking-${booking.id}`}
                      >
                        <CardContent>
                          <Typography variant="h6" id={`booking-${booking.id}`}>
                            {booking.title}
                          </Typography>
                          <Typography>
                            <b>
                              {user?.role === "student" ? "Tutor" : "Student"}:
                            </b>{" "}
                            {booking.extendedProps.tutor ||
                              booking.extendedProps.student}
                          </Typography>
                          <Typography>
                            <b>Start Time:</b>{" "}
                            {new Date(booking.start).toLocaleString()}
                          </Typography>
                          <Typography>
                            <b>Duration:</b>{" "}
                            {booking.extendedProps.duration || "N/A"} mins
                          </Typography>
                          <Typography>
                            <b>Status:</b> {booking.extendedProps.status}
                          </Typography>
                          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                            {user?.role === "tutor" && (
                              <>
                                {booking.extendedProps.status === "pending" && (
                                  <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() =>
                                      updateSession(booking.id, "confirmed")
                                    }
                                    aria-label={`Confirm session for ${booking.title}`}
                                  >
                                    Confirm
                                  </Button>
                                )}
                                {booking.extendedProps.status ===
                                  "confirmed" && (
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                      updateSession(booking.id, "completed")
                                    }
                                    aria-label={`Mark session complete for ${booking.title}`}
                                  >
                                    Complete
                                  </Button>
                                )}
                              </>
                            )}
                            {user?.role === "student" &&
                              booking.extendedProps.status !== "cancelled" && (
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={() =>
                                    updateSession(booking.id, "cancelled")
                                  }
                                  aria-label={`Cancel session for ${booking.title}`}
                                >
                                  Cancel
                                </Button>
                              )}
                          </Box>
                        </CardContent>
                      </Card>
                    )
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Full width Available Study Groups section */}
      {user?.role === "student" && (
        <Box sx={{ width: "100%", mt: 4 }}>
          <Typography
            variant="h5"
            fontWeight={700}
            mb={2}
            id="available-study-groups"
          >
            Available Study Groups ({availableStudyGroups.length})
          </Typography>
          <Card>
            <CardContent>
              {availableStudyGroups.length === 0 ? (
                <Typography
                  sx={{
                    textAlign: "center",
                    py: 4,
                    color: "text.secondary",
                    fontSize: "1.1rem",
                  }}
                >
                  No available study groups at the moment.
                </Typography>
              ) : availableStudyGroups.length <= 2 ? (
                // Simple side-by-side display for 1-2 cards
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 3,
                    p: 2,
                  }}
                >
                  {availableStudyGroups.map((group) => (
                    <Card
                      key={group._id}
                      sx={{
                        width: "500px",
                        height: "450px",
                        p: 3,
                        borderLeft: "4px solid var(--primary-color)",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          color="primary"
                          gutterBottom
                          sx={{ fontSize: "1.5rem", fontWeight: 600 }}
                        >
                          {group.title}
                        </Typography>

                        {group.description && (
                          <Typography
                            color="text.secondary"
                            sx={{
                              mb: 3,
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              fontSize: "1.1rem",
                            }}
                          >
                            {group.description}
                          </Typography>
                        )}

                        <Box sx={{ mb: 2.5 }}>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            sx={{ fontSize: "1rem" }}
                          >
                            Subject
                          </Typography>
                          <Typography sx={{ fontSize: "1.1rem" }}>
                            {group.subject}
                          </Typography>
                        </Box>

                        <Box sx={{ mb: 2.5 }}>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            sx={{ fontSize: "1rem" }}
                          >
                            Date & Time
                          </Typography>
                          <Typography sx={{ fontSize: "1.1rem" }}>
                            {new Date(group.date).toLocaleDateString()} at{" "}
                            {group.time}
                          </Typography>
                        </Box>

                        <Box sx={{ mb: 2.5 }}>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            sx={{ fontSize: "1rem" }}
                          >
                            Created by
                          </Typography>
                          <Typography sx={{ fontSize: "1.1rem" }}>
                            {group.creator.name}
                          </Typography>
                        </Box>
                      </Box>

                      <StudyGroupActions group={group} />
                    </Card>
                  ))}
                </Box>
              ) : (
                // Carousel display for 3+ cards
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <IconButton
                    onClick={() => scrollCarousel("left")}
                    aria-label="Previous study group"
                  >
                    <ChevronLeft />
                  </IconButton>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "60%",
                      position: "relative",
                      height: "500px",
                      overflow: "hidden",
                      margin: "0 auto",
                    }}
                  >
                    {availableStudyGroups.map((group, index) => {
                      let position = index - currentCardIndex;

                      if (
                        currentCardIndex === 0 &&
                        index === availableStudyGroups.length - 1
                      ) {
                        position = -1;
                      } else if (
                        currentCardIndex === availableStudyGroups.length - 1 &&
                        index === 0
                      ) {
                        position = 1;
                      } else if (position < -1) {
                        position = 1;
                      } else if (position > 1) {
                        position = -1;
                      }

                      return (
                        <Card
                          key={group._id}
                          sx={{
                            width: "500px",
                            height: "450px",
                            position: "absolute",
                            left: "50%",
                            transform: `translateX(${
                              -50 + position * 85
                            }%) scale(${position === 0 ? 1 : 0.8})`,
                            opacity: position === 0 ? 1 : 0.5,
                            transition: "all 0.3s ease-in-out",
                            visibility:
                              Math.abs(position) <= 1 ? "visible" : "hidden",
                            p: 3,
                            borderLeft: "4px solid var(--primary-color)",
                            display: "flex",
                            flexDirection: "column",
                            zIndex: position === 0 ? 2 : 1,
                          }}
                        >
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="h6"
                              color="primary"
                              gutterBottom
                              sx={{ fontSize: "1.5rem", fontWeight: 600 }}
                            >
                              {group.title}
                            </Typography>

                            {group.description && (
                              <Typography
                                color="text.secondary"
                                sx={{
                                  mb: 3,
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  fontSize: "1.1rem",
                                }}
                              >
                                {group.description}
                              </Typography>
                            )}

                            <Box sx={{ mb: 2.5 }}>
                              <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                sx={{ fontSize: "1rem" }}
                              >
                                Subject
                              </Typography>
                              <Typography sx={{ fontSize: "1.1rem" }}>
                                {group.subject}
                              </Typography>
                            </Box>

                            <Box sx={{ mb: 2.5 }}>
                              <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                sx={{ fontSize: "1rem" }}
                              >
                                Date & Time
                              </Typography>
                              <Typography sx={{ fontSize: "1.1rem" }}>
                                {new Date(group.date).toLocaleDateString()} at{" "}
                                {group.time}
                              </Typography>
                            </Box>

                            <Box sx={{ mb: 2.5 }}>
                              <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                sx={{ fontSize: "1rem" }}
                              >
                                Created by
                              </Typography>
                              <Typography sx={{ fontSize: "1.1rem" }}>
                                {group.creator.name}
                              </Typography>
                            </Box>
                          </Box>

                          <StudyGroupActions
                            group={group}
                            position={position}
                          />
                        </Card>
                      );
                    })}
                  </Box>

                  <IconButton
                    onClick={() => scrollCarousel("right")}
                    aria-label="Next study group"
                  >
                    <ChevronRight />
                  </IconButton>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      )}

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
