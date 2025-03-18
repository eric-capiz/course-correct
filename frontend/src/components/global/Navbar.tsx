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
  CircularProgress,
} from "@mui/material";
import {
  AccountCircle,
  Menu as MenuIcon,
  Login,
  PersonAdd,
  Hub,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth/tempauthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const { user, logout, loading } = useAuth();

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const toggleAuthMode = () => setIsLogin((prev) => !prev);

  const renderLearningHubButton = (user) => {
    if (!user || user.role !== "student") return null;

    return (
      <Button
        variant="outlined"
        sx={{
          borderColor: "var(--primary-color)",
          color: "var(--primary-color)",
          whiteSpace: "nowrap",
          minWidth: "85px",
          padding: "6px 14px",
          "&:hover": {
            backgroundColor: "var(--primary-color)",
            color: "#fff",
          },
        }}
        aria-label="Go to Learning Hub"
        component={Link}
        to="/learning-hub"
      >
        Learning Hub
      </Button>
    );
  };

  if (loading) {
    return (
      <CircularProgress
        sx={{
          color: "var(--primary-color)",
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      />
    );
  }

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "var(--background-color)",
          boxShadow: "none",
          borderBottom: "1px solid #CBD5E1",
          px: 2,
        }}
      >
        <Toolbar
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "var(--font-heading)",
              color: "var(--primary-color)",
              fontWeight: 700,
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

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {user ? (
              <>
                {renderLearningHubButton(user)}
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "var(--primary-color)",
                    color: "var(--primary-color)",
                    whiteSpace: "nowrap",
                    minWidth: "85px",
                    padding: "6px 14px",
                    "&:hover": {
                      backgroundColor: "var(--primary-color)",
                      color: "#fff",
                    },
                  }}
                  aria-label="Go to profile"
                  component={Link}
                  to="/profile"
                >
                  {user.username} Profile
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "var(--primary-color)",
                    whiteSpace: "nowrap",
                    minWidth: "85px",
                    padding: "6px 14px",
                    "&:hover": { backgroundColor: "#172554" },
                  }}
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
                  sx={{
                    borderColor: "var(--primary-color)",
                    color: "var(--primary-color)",
                    whiteSpace: "nowrap",
                    minWidth: "85px",
                    padding: "6px 14px",
                    "&:hover": {
                      backgroundColor: "var(--primary-color)",
                      color: "#fff",
                    },
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
                  sx={{
                    backgroundColor: "var(--primary-color)",
                    whiteSpace: "nowrap",
                    minWidth: "85px",
                    padding: "6px 14px",
                    "&:hover": { backgroundColor: "#172554" },
                  }}
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
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "var(--font-heading)",
              color: "var(--primary-color)",
              fontWeight: 700,
              flexGrow: 1,
              textAlign: "center",
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
            sx={{ color: "var(--primary-color)" }}
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
          sx={{ width: 250 }}
          role="presentation"
          onKeyDown={(e) => e.key === "Escape" && setMenuOpen(false)}
        >
          <List>
            {user ? (
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
                        <Hub />
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
                      <AccountCircle />
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
                      <Login />
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
                      <Login />
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
                      <PersonAdd />
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
