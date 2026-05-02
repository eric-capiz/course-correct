import { useState } from "react";
import AuthModal from "@/components/modals/AuthModal";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  AccountCircle,
  Menu as MenuIcon,
  Login,
  PersonAdd,
  Hub,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import { useAuth } from "@/context/auth/authContext";
import type { User } from "@/context/auth/authContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const { user, logout, loading } = useAuth();

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const toggleAuthMode = () => setIsLogin((prev) => !prev);

  const renderLearningHubButton = (u: User | null) => {
    if (!u || u.role !== "student") return null;

    return (
      <Button
        variant="outlined"
        color="primary"
        sx={{
          whiteSpace: "nowrap",
          minWidth: "88px",
          py: 0.75,
          borderColor: (t) => alpha(t.palette.primary.main, 0.45),
        }}
        aria-label="Go to Learning Hub"
        component={Link}
        to="/learning-hub"
      >
        Learning Hub
      </Button>
    );
  };

  return (
    <>
      <AppBar position="sticky" sx={{ px: { xs: 1, sm: 2 } }}>
        <Toolbar
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: 72,
            gap: 2,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "text.primary",
              textShadow: (theme) =>
                `0 1px 0 ${alpha("#000", 0.35)}, 0 0 48px ${alpha(theme.palette.primary.main, 0.25)}`,
            }}
          >
            <Link
              to="/"
              style={{ textDecoration: "none", color: "inherit" }}
              aria-label="Go to home page"
            >
              Course Correct
            </Link>
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
            {loading ? (
              <Typography variant="body2" color="text.secondary">
                Loading...
              </Typography>
            ) : user ? (
              <>
                {renderLearningHubButton(user)}
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    whiteSpace: "nowrap",
                    minWidth: "88px",
                    borderColor: (t) => alpha(t.palette.primary.main, 0.45),
                  }}
                  aria-label="Go to profile"
                  component={Link}
                  to="/profile"
                >
                  {user.username} Profile
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ whiteSpace: "nowrap", minWidth: "88px" }}
                  aria-label="Log out"
                  onClick={logout}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    whiteSpace: "nowrap",
                    minWidth: "88px",
                    borderColor: (t) => alpha(t.palette.primary.main, 0.45),
                  }}
                  aria-label="Log in"
                  onClick={() => {
                    setIsLogin(true);
                    setAuthOpen(true);
                  }}
                >
                  Log In
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ whiteSpace: "nowrap", minWidth: "88px" }}
                  aria-label="Sign up"
                  onClick={() => {
                    setIsLogin(false);
                    setAuthOpen(true);
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>

        <Toolbar
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: 64,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              flexGrow: 1,
              textAlign: "center",
              color: "text.primary",
              textShadow: (theme) =>
                `0 1px 0 ${alpha("#000", 0.35)}, 0 0 40px ${alpha(theme.palette.primary.main, 0.22)}`,
            }}
          >
            <Link
              to="/"
              style={{ textDecoration: "none", color: "inherit" }}
              aria-label="Go to home page"
            >
              Course Correct
            </Link>
          </Typography>

          <IconButton
            onClick={() => setMenuOpen(true)}
            color="primary"
            edge="end"
            aria-label="Open navigation menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        role="navigation"
      >
        <Box
          sx={{ width: 280, pt: 2 }}
          role="presentation"
          onKeyDown={(e) => e.key === "Escape" && setMenuOpen(false)}
        >
          <List>
            {loading ? (
              <ListItem>
                <ListItemText primary="Loading..." />
              </ListItem>
            ) : user ? (
              <>
                {user.role === "student" && (
                  <ListItem disablePadding>
                    <ListItemButton
                      component={Link}
                      to="/learning-hub"
                      onClick={() => setMenuOpen(false)}
                      aria-label="Go to Learning Hub"
                    >
                      <ListItemIcon>
                        <Hub color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Learning Hub" />
                    </ListItemButton>
                  </ListItem>
                )}
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Go to profile page"
                  >
                    <ListItemIcon>
                      <AccountCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${capitalize(user.username)} Profile`}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    aria-label="Log out"
                  >
                    <ListItemIcon>
                      <Login color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Log Out" />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setIsLogin(true);
                      setAuthOpen(true);
                      setMenuOpen(false);
                    }}
                    aria-label="Log in"
                  >
                    <ListItemIcon>
                      <Login color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Log In" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setIsLogin(false);
                      setAuthOpen(true);
                      setMenuOpen(false);
                    }}
                    aria-label="Sign up"
                  >
                    <ListItemIcon>
                      <PersonAdd color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Sign Up" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        isLogin={isLogin}
        toggleAuthMode={toggleAuthMode}
      />
    </>
  );
};

export default Navbar;
