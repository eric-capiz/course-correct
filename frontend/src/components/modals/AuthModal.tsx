import { useState, useEffect, KeyboardEvent } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useAuth } from "@/context/auth/tempauthContext";

const roles = ["student", "tutor"];
const gradeLevels = [
  "H.S-Freshman",
  "H.S-Sophomore",
  "H.S-Junior",
  "H.S-Senior",
  "Uni-Freshman",
  "Uni-Sophomore",
  "Uni-Junior",
  "Uni-Senior",
];

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  isLogin: boolean;
  toggleAuthMode: () => void;
}

const AuthModal = ({
  open,
  onClose,
  isLogin,
  toggleAuthMode,
}: AuthModalProps) => {
  const { login, signup } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
    subjects: "",
    gradeLevel: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Autofocus first input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        const firstInput = document.querySelector<HTMLInputElement>("input");
        firstInput?.focus();
      }, 100);
    }
  }, [open]);

  // Handle keyboard events
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") onClose();
    if (e.key === "Enter") handleSubmit();
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // Login
        await login({ email: formData.email, password: formData.password });
      } else {
        // Signup
        await signup({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          subjects: formData.subjects.split(",").map((s) => s.trim()),
          gradeLevel: formData.gradeLevel,
        });
      }
      onClose();
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      BackdropProps={{ sx: { backgroundColor: "rgba(0, 0, 0, 0.6)" } }}
    >
      <Box
        sx={{
          backgroundColor: "var(--background-light)",
          color: "var(--text-light)",
          maxWidth: "400px",
          mx: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: 4,
          borderRadius: "8px",
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ alignSelf: "flex-end", color: "var(--text-light)" }}
          aria-label="Close authentication modal"
        >
          <Close />
        </IconButton>

        <Typography variant="h5" fontWeight={700} textAlign="center">
          {isLogin ? "Log In" : "Sign Up"}
        </Typography>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Form Fields */}
        {!isLogin && (
          <>
            <TextField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              required
            />
          </>
        )}

        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
        />

        {!isLogin && (
          <>
            <TextField
              select
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              fullWidth
              required
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Grade Level"
              name="gradeLevel"
              value={formData.gradeLevel}
              onChange={handleChange}
              fullWidth
              required
            >
              {gradeLevels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Subjects (Comma Separated)"
              name="subjects"
              value={formData.subjects}
              onChange={handleChange}
              fullWidth
              required
            />
          </>
        )}

        {/* Submit Button */}
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            backgroundColor: "var(--primary-color)",
            "&:hover": { backgroundColor: "var(--button-primary-hover)" },
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : isLogin ? (
            "Log In"
          ) : (
            "Sign Up"
          )}
        </Button>

        <Typography variant="body2" textAlign="center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Button
            variant="text"
            onClick={toggleAuthMode}
            sx={{ color: "var(--primary-color)" }}
          >
            {isLogin ? "Sign Up Here" : "Log In Here"}
          </Button>
        </Typography>
      </Box>
    </Modal>
  );
};

export default AuthModal;
