import { Box, Typography, IconButton, Tooltip, Paper } from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  AccountCircle,
  AlternateEmail,
  Email,
  School,
  Class,
  Badge,
  Edit,
} from "@mui/icons-material";

interface ProfileDetailsProps {
  user: {
    name?: string;
    username?: string;
    email?: string;
    role?: string;
    gradeLevel?: string;
    subjects?: string[];
  } | null;
  onEditClick: () => void;
}

const ProfileDetails = ({ user, onEditClick }: ProfileDetailsProps) => {
  return (
    <Paper
      sx={{
        flex: { xs: "1 1 100%", lg: "0 0 340px" },
        maxWidth: { xs: "100%", lg: 360 },
        p: { xs: 2.5, md: 3 },
        borderRadius: 3,
        height: "fit-content",
        position: "sticky",
        top: 96,
      }}
      aria-labelledby="profile-details"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          gap: 1,
        }}
      >
        <Typography variant="h5" fontWeight={800} color="primary" id="profile-details">
          Profile Details
        </Typography>
        <Tooltip title="Edit Profile">
          <IconButton
            onClick={onEditClick}
            aria-label="edit profile"
            color="primary"
            sx={{
              "&:hover": {
                bgcolor: (t) => alpha(t.palette.primary.main, 0.12),
              },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: "2px",
              },
            }}
          >
            <Edit />
          </IconButton>
        </Tooltip>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          "& > div": {
            p: 1.25,
            borderRadius: 2,
            transition: "background 0.2s ease",
            "&:hover": {
              bgcolor: (t) => alpha(t.palette.primary.main, 0.06),
            },
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <AccountCircle color="primary" />
          <Typography variant="body2">
            <Box component="span" fontWeight={700}>
              Name:
            </Box>{" "}
            {user?.name}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <AlternateEmail color="primary" />
          <Typography variant="body2">
            <Box component="span" fontWeight={700}>
              Username:
            </Box>{" "}
            {user?.username}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Email color="primary" />
          <Typography variant="body2">
            <Box component="span" fontWeight={700}>
              Email:
            </Box>{" "}
            {user?.email}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Badge color="primary" />
          <Typography variant="body2">
            <Box component="span" fontWeight={700}>
              Role:
            </Box>{" "}
            {user?.role}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <School color="primary" />
          <Typography variant="body2">
            <Box component="span" fontWeight={700}>
              Grade Level:
            </Box>{" "}
            {user?.gradeLevel}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Class color="primary" />
          <Typography
            variant="body2"
            sx={{
              flex: 1,
              wordBreak: "break-word",
            }}
          >
            <Box component="span" fontWeight={700}>
              Subjects:
            </Box>{" "}
            {user?.subjects?.join(", ")}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProfileDetails;
