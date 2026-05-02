import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

const StudyGroups = ({
  user,
  userStudyGroups,
  leaveStudyGroup,
  deleteStudyGroup,
  getAllStudyGroups,
}) => {
  if (user?.role !== "student") return null;

  return (
    <>
      <Typography variant="h5" fontWeight={700} mb={2} id="study-groups">
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
                    borderLeft: "4px solid",
                    borderColor: "primary.main",
                    "&:hover": {
                      boxShadow: (t) =>
                        `0 12px 40px ${alpha("#000", 0.35)}, 0 0 40px ${alpha(t.palette.primary.main, 0.15)}`,
                      transform: "translateY(-3px)",
                    },
                    transition: "all 0.25s ease",
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
                      <Typography variant="subtitle2" color="text.secondary">
                        Subject
                      </Typography>
                      <Typography>{group.subject}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Date & Time
                      </Typography>
                      <Typography>
                        {new Date(group.date).toLocaleDateString()} at{" "}
                        {group.time}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Duration
                      </Typography>
                      <Typography>{group.duration} minutes</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
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
                            borderRadius: 1,
                            borderColor: (t) =>
                              participant._id === group.creator._id
                                ? alpha(t.palette.primary.main, 0.45)
                                : alpha(t.palette.divider, 1),
                            backgroundColor: (t) =>
                              participant._id === group.creator._id
                                ? alpha(t.palette.primary.main, 0.12)
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
                            console.error("Error deleting study group:", error);
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
  );
};

export default StudyGroups;
