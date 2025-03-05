import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormHelperText,
  SelectChangeEvent,
  IconButton,
  InputAdornment,
  Typography,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  subjects: string[];
  gradeLevel: string;
}

interface UpdateUserData {
  name?: string;
  username?: string;
  email?: string;
  role?: string;
  subjects?: string[];
  gradeLevel?: string;
  password?: string;
}

const GRADE_LEVELS = [
  "H.S-Freshman",
  "H.S-Sophomore",
  "H.S-Junior",
  "H.S-Senior",
  "Uni-Freshman",
  "Uni-Sophomore",
  "Uni-Junior",
  "Uni-Senior",
];

interface EditProfileDialogProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
  updateUser: (userId: string, data: UpdateUserData) => Promise<void>;
}

const EditProfileDialog = ({
  open,
  onClose,
  user,
  updateUser,
}: EditProfileDialogProps) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    role: user?.role || "student",
    subjects: user?.subjects || [],
    gradeLevel: user?.gradeLevel || "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e: SelectChangeEvent) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const handleGradeLevelChange = (e: SelectChangeEvent) => {
    setFormData({ ...formData, gradeLevel: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (user?._id) {
        const updateData: UpdateUserData = { ...formData };
        if (!formData.password) {
          delete updateData.password;
        }
        await updateUser(user._id, updateData);
        onClose();
      }
    } catch (err) {
      setError("Failed to update profile");
      console.error("Error updating profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="edit-profile-title"
      aria-describedby="edit-profile-description"
      disableEscapeKeyDown={false}
      keepMounted
      sx={{
        "& .MuiDialog-paper": {
          margin: { xs: 2, sm: 4 },
          width: "calc(100% - 32px)",
          maxWidth: "sm",
        },
      }}
    >
      <DialogTitle id="edit-profile-title">Edit Profile</DialogTitle>
      <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography id="edit-profile-description" sx={{ mb: 2 }}>
          Only changed fields will be updated.
        </Typography>
        <form onSubmit={handleSubmit} noValidate id="edit-profile-form">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 2, sm: 3 },
            }}
          >
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              inputProps={{
                "aria-label": "Name",
              }}
              size="medium"
            />
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              inputProps={{
                "aria-label": "Username",
              }}
              size="medium"
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              inputProps={{
                "aria-label": "Email",
              }}
              size="medium"
            />
            <FormControl fullWidth size="medium">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                value={formData.role}
                onChange={handleRoleChange}
                label="Role"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: { xs: "40vh", sm: "50vh" },
                    },
                  },
                }}
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="tutor">Tutor</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="medium">
              <InputLabel id="grade-level-label">Grade Level</InputLabel>
              <Select
                labelId="grade-level-label"
                value={formData.gradeLevel}
                onChange={handleGradeLevelChange}
                label="Grade Level"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: { xs: "40vh", sm: "50vh" },
                    },
                  },
                }}
              >
                {GRADE_LEVELS.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Subjects"
              name="subjects"
              value={formData.subjects.join(", ")}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  subjects: e.target.value.split(",").map((s) => s.trim()),
                });
              }}
              fullWidth
              helperText="Enter subjects separated by commas"
              inputProps={{
                "aria-label": "Subjects",
              }}
              size="medium"
            />
            <TextField
              label="New Password (Optional)"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              fullWidth
              size="medium"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              aria-describedby="password-helper-text"
            />
            <FormHelperText id="password-helper-text">
              Leave blank to keep current password
            </FormHelperText>

            {error && (
              <Alert
                severity="error"
                aria-live="polite"
                sx={{
                  mt: 2,
                  width: "100%",
                }}
              >
                {error}
              </Alert>
            )}
          </Box>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: { xs: 2, sm: 3 } }}>
        <Button
          onClick={onClose}
          color="inherit"
          disabled={loading}
          aria-label="Cancel editing profile"
          sx={{ mr: 1 }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          aria-label="Save profile changes"
          form="edit-profile-form"
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileDialog;
