import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import {
  AccountCircle,
  AlternateEmail,
  Email,
  School,
  Class,
  Badge,
  Edit,
} from "@mui/icons-material";

const ProfileDetails = ({ user, onEditClick }) => {
  return (
    <Box
      sx={{
        flex: { xs: "1 1 100%", md: "1 1 30%" },
        borderRight: { md: "1px solid #ddd" },
        pr: { md: 3 },
        p: 3,
        borderRadius: "8px",
        backgroundColor: "#f9fafb",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        height: "fit-content",
        maxWidth: { xs: "100%", md: "350px" },
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
            onClick={onEditClick}
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

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          "& > div": {
            padding: 1,
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.02)",
            },
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <AccountCircle sx={{ color: "var(--primary-color)" }} />
          <Typography>
            <b>Name:</b> {user?.name}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <AlternateEmail sx={{ color: "var(--primary-color)" }} />
          <Typography>
            <b>Username:</b> {user?.username}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Email sx={{ color: "var(--primary-color)" }} />
          <Typography>
            <b>Email:</b> {user?.email}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Badge sx={{ color: "var(--primary-color)" }} />
          <Typography>
            <b>Role:</b> {user?.role}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <School sx={{ color: "var(--primary-color)" }} />
          <Typography>
            <b>Grade Level:</b> {user?.gradeLevel}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Class sx={{ color: "var(--primary-color)" }} />
          <Typography
            sx={{
              flex: 1,
              wordBreak: "break-word",
            }}
          >
            <b>Subjects:</b> {user?.subjects.join(", ")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileDetails;
