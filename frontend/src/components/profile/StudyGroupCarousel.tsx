import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useState } from "react";

const StudyGroupCarousel = ({
  user,
  availableStudyGroups,
  joinStudyGroup,
  getAllStudyGroups,
}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

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

  if (user?.role !== "student") return null;

  const getCardWidth = () => {
    if (isMobile) return "170px";
    if (isTablet) return "400px";
    return "500px";
  };

  const getCardHeight = () => {
    if (isMobile) return "375px";
    if (isTablet) return "425px";
    return "450px";
  };

  const getCarouselWidth = () => {
    if (isMobile) return "95%";
    if (isTablet) return "75%";
    return "60%";
  };

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <Typography
        variant="h5"
        fontWeight={700}
        mb={2}
        id="available-study-groups"
        sx={{
          fontSize: { xs: "1.25rem", sm: "1.5rem" },
        }}
      >
        Available Study Groups ({availableStudyGroups.length})
      </Typography>
      <Card>
        <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
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
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "center",
                alignItems: "center",
                gap: { xs: 2, sm: 3 },
                p: { xs: 1, sm: 2 },
              }}
            >
              {availableStudyGroups.map((group) => (
                <Card
                  key={group._id}
                  sx={{
                    width: { xs: "100%", sm: getCardWidth() },
                    height: getCardHeight(),
                    p: { xs: 2, sm: 3 },
                    borderLeft: "4px solid var(--primary-color)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <StudyGroupContent
                    group={group}
                    joinStudyGroup={joinStudyGroup}
                    getAllStudyGroups={getAllStudyGroups}
                    disabled={false}
                    isMobile={isMobile}
                  />
                </Card>
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: { xs: 1, sm: 2 },
                px: { xs: 0, sm: 2 },
              }}
            >
              <IconButton
                onClick={() => scrollCarousel("left")}
                aria-label="Previous study group"
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                <ChevronLeft />
              </IconButton>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: getCarouselWidth(),
                  position: "relative",
                  height: { xs: "420px", sm: "500px" },
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

                  // Mobile view: show only current card
                  if (isMobile && position !== 0) return null;

                  return (
                    <Card
                      key={group._id}
                      sx={{
                        width: getCardWidth(),
                        height: getCardHeight(),
                        position: "absolute",
                        left: "50%",
                        transform: isMobile
                          ? "translateX(-50%)"
                          : `translateX(${-50 + position * 85}%) scale(${
                              position === 0 ? 1 : 0.8
                            })`,
                        opacity: position === 0 ? 1 : 0.5,
                        transition: "all 0.3s ease-in-out",
                        visibility:
                          Math.abs(position) <= 1 ? "visible" : "hidden",
                        p: { xs: 1.5, sm: 3 },
                        borderLeft: "4px solid var(--primary-color)",
                        display: "flex",
                        flexDirection: "column",
                        zIndex: position === 0 ? 2 : 1,
                      }}
                    >
                      <StudyGroupContent
                        group={group}
                        joinStudyGroup={joinStudyGroup}
                        getAllStudyGroups={getAllStudyGroups}
                        disabled={position !== 0}
                        isMobile={isMobile}
                      />
                    </Card>
                  );
                })}
              </Box>

              <IconButton
                onClick={() => scrollCarousel("right")}
                aria-label="Next study group"
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                <ChevronRight />
              </IconButton>
            </Box>
          )}

          {/* Mobile Navigation Dots */}
          {isMobile && availableStudyGroups.length > 2 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1,
                mt: 1,
                mb: 1,
              }}
            >
              {availableStudyGroups.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setCurrentCardIndex(index)}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor:
                      currentCardIndex === index ? "primary.main" : "grey.300",
                    cursor: "pointer",
                  }}
                />
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

// Extracted card content into a separate component for reusability
const StudyGroupContent = ({
  group,
  joinStudyGroup,
  getAllStudyGroups,
  disabled,
  isMobile,
}) => (
  <>
    <Box sx={{ flex: 1 }}>
      <Typography
        variant="h6"
        color="primary"
        gutterBottom
        sx={{
          fontSize: { xs: "1.1rem", sm: "1.5rem" },
          fontWeight: 600,
          lineHeight: { xs: 1.2, sm: 1.5 },
        }}
      >
        {group.title}
      </Typography>

      {group.description && (
        <Typography
          color="text.secondary"
          sx={{
            mb: { xs: 2, sm: 3 },
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: { xs: "0.9rem", sm: "1.1rem" },
            lineHeight: { xs: 1.4, sm: 1.6 },
          }}
        >
          {group.description}
        </Typography>
      )}

      <Box sx={{ mb: { xs: 2, sm: 2.5 } }}>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}
        >
          Subject
        </Typography>
        <Typography sx={{ fontSize: { xs: "0.9rem", sm: "1.1rem" } }}>
          {group.subject}
        </Typography>
      </Box>

      <Box sx={{ mb: { xs: 2, sm: 2.5 } }}>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}
        >
          Date & Time
        </Typography>
        <Typography sx={{ fontSize: { xs: "0.9rem", sm: "1.1rem" } }}>
          {new Date(group.date).toLocaleDateString()} at {group.time}
        </Typography>
      </Box>

      <Box sx={{ mb: { xs: 2, sm: 2.5 } }}>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}
        >
          Created by
        </Typography>
        <Typography sx={{ fontSize: { xs: "0.9rem", sm: "1.1rem" } }}>
          {group.creator.name}
        </Typography>
      </Box>
    </Box>

    <Button
      variant="contained"
      color="primary"
      fullWidth
      size={isMobile ? "medium" : "large"}
      onClick={async () => {
        try {
          await joinStudyGroup(group._id);
          getAllStudyGroups();
        } catch (error) {
          console.error("Error joining study group:", error);
        }
      }}
      disabled={disabled}
      aria-label={`Join ${group.title} study group`}
      sx={{
        py: { xs: 1, sm: 1.5 },
        mt: { xs: 1, sm: 2 },
      }}
    >
      Join Group
    </Button>
  </>
);

export default StudyGroupCarousel;
