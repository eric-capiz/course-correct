import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  ivyBodyMutedSx,
  ivyEmptyStateSx,
  ivyFieldLabelSx,
  ivyNestedCardSx,
  ivyParticipantChipSx,
} from "@/components/profile/ivyProfileCards";

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
      <Typography
        variant="h5"
        fontWeight={700}
        mb={2}
        id="study-groups"
        sx={{ fontFamily: '"Cormorant Garamond", Georgia, serif', letterSpacing: "0.02em" }}
      >
        Study Groups ({userStudyGroups.length})
      </Typography>
      <Card
        sx={{
          mb: 4,
          bgcolor: (theme) => alpha(theme.palette.background.paper, 1),
          border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.22)}`,
          boxShadow: `inset 0 1px 0 ${alpha("#fff", 0.55)}, 0 16px 48px ${alpha("#000", 0.12)}`,
        }}
      >
        <CardContent>
          {userStudyGroups.length > 0 ? (
            <Box sx={{ display: "grid", gap: 3 }}>
              {userStudyGroups.map((group) => (
                <Card
                  key={group._id}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    ...ivyNestedCardSx,
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: (theme) =>
                        `inset 0 1px 0 ${alpha("#fff", 0.9)}, 0 16px 44px ${alpha("#000", 0.12)}, 0 0 0 1px ${alpha(theme.palette.primary.main, 0.35)}`,
                    },
                  }}
                  role="article"
                  aria-labelledby={`group-title-${group._id}`}
                >
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="h6"
                      id={`group-title-${group._id}`}
                      gutterBottom
                      sx={{
                        fontFamily: '"Cormorant Garamond", Georgia, serif',
                        fontWeight: 600,
                        color: (theme) => theme.palette.primary.dark,
                      }}
                    >
                      {group.title}
                    </Typography>
                    {group.description && (
                      <Typography sx={{ ...ivyBodyMutedSx, mb: 2 }} component="p">
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
                      <Typography component="span" sx={ivyFieldLabelSx}>
                        Subject
                      </Typography>
                      <Typography sx={{ fontWeight: 600, color: (theme) => alpha(theme.palette.common.black, 0.87) }}>
                        {group.subject}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography component="span" sx={ivyFieldLabelSx}>
                        Date & Time
                      </Typography>
                      <Typography sx={{ fontWeight: 600, color: (theme) => alpha(theme.palette.common.black, 0.87) }}>
                        {new Date(group.date).toLocaleDateString()} at{" "}
                        {group.time}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography component="span" sx={ivyFieldLabelSx}>
                        Duration
                      </Typography>
                      <Typography sx={{ fontWeight: 600, color: (theme) => alpha(theme.palette.common.black, 0.87) }}>
                        {group.duration} minutes
                      </Typography>
                    </Box>
                    <Box>
                      <Typography component="span" sx={ivyFieldLabelSx}>
                        Created by
                      </Typography>
                      <Typography sx={{ fontWeight: 600, color: (theme) => alpha(theme.palette.common.black, 0.87) }}>
                        {group.creator.name}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      mt: 2,
                      pt: 2,
                      borderTop: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{ ...ivyFieldLabelSx, mb: 1.25 }}
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
                          sx={ivyParticipantChipSx(participant._id === group.creator._id)}
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
            <Typography sx={ivyEmptyStateSx}>No study groups joined yet.</Typography>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default StudyGroups;
