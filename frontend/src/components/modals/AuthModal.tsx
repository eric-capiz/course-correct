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
  Paper,
} from "@mui/material";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import { useAuth } from "@/context/auth/authContext";
import {
  ivyParchmentHelperTextSx,
  ivyParchmentIconButtonSx,
  ivyParchmentTextFieldSx,
} from "@/components/profile/ivyProfileCards";

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
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        const firstInput = document.querySelector<HTMLInputElement>(
          '[data-auth-modal] input'
        );
        firstInput?.focus();
      }, 100);
    }
  }, [open]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") onClose();
    if (e.key === "Enter") handleSubmit();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        await login({ email: formData.email, password: formData.password });
      } else {
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
    } catch (err: unknown) {
      const ax = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const apiMessage = ax.response?.data?.message;
      const fallback = isLogin
        ? "Invalid email or password. Please check your credentials and try again."
        : "Something went wrong. Please check your details and try again.";
      setError(apiMessage || fallback);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      BackdropProps={{
        sx: {
          backgroundColor: alpha("#000000", 0.72),
          backdropFilter: "blur(6px)",
        },
      }}
    >
      <Paper
        data-auth-modal
        elevation={0}
        sx={{
          maxWidth: 440,
          width: "calc(100% - 32px)",
          mx: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: { xs: 3, sm: 4 },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: 3,
          border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.25)}`,
          boxShadow: (t) =>
            `0 0 0 1px ${alpha("#fff", 0.04)}, 0 32px 100px ${alpha("#000", 0.55)}, 0 0 60px ${alpha(t.palette.primary.main, 0.12)}`,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ alignSelf: "flex-end", ...ivyParchmentIconButtonSx }}
          aria-label="Close authentication modal"
        >
          <Close />
        </IconButton>

        <Typography variant="h5" fontWeight={600} textAlign="center" sx={{ color: "inherit" }}>
          {isLogin ? "Log In" : "Sign Up"}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 1 }}>
            {error}
          </Alert>
        )}

        {!isLogin && (
          <>
            <TextField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              sx={ivyParchmentTextFieldSx}
            />
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              required
              sx={ivyParchmentTextFieldSx}
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
          sx={ivyParchmentTextFieldSx}
        />
        <TextField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
          sx={ivyParchmentTextFieldSx}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
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
              sx={ivyParchmentTextFieldSx}
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
              sx={ivyParchmentTextFieldSx}
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
              sx={ivyParchmentTextFieldSx}
            />
          </>
        )}

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmit}
          disabled={loading}
          fullWidth
          sx={{ py: 1.25, mt: 1 }}
        >
          {loading ? (
            <CircularProgress size={26} sx={{ color: "primary.contrastText" }} />
          ) : isLogin ? (
            "Log In"
          ) : (
            "Sign Up"
          )}
        </Button>

        <Typography variant="body2" textAlign="center" sx={ivyParchmentHelperTextSx}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Button
            variant="text"
            color="primary"
            onClick={toggleAuthMode}
            sx={{ fontWeight: 700, verticalAlign: "baseline", p: 0, minWidth: 0 }}
          >
            {isLogin ? "Sign Up Here" : "Log In Here"}
          </Button>
        </Typography>
      </Paper>
    </Modal>
  );
};

export default AuthModal;
