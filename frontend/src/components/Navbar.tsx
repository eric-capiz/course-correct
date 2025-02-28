"use client";

import { useState } from "react";
import AuthModal from "./modals/AuthModal";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import {
  Search,
  AccountCircle,
  Menu as MenuIcon,
  Group,
  School,
  Login,
  PersonAdd,
} from "@mui/icons-material";
import Link from "next/link";
import { useAuth } from "@/context/auth/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const { user, logout, loading } = useAuth();

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const toggleAuthMode = () => setIsLogin((prev) => !prev);

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
              href="/"
              style={{ textDecoration: "none", color: "inherit" }}
              aria-label="Go to home page"
            >
              Course Correct
            </Link>
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid var(--secondary-color)",
              borderRadius: "8px",
              px: 2,
              py: 0.5,
              width: "100%",
              maxWidth: { xs: "100%", sm: "70%", md: "50%" },
              mx: "auto",
            }}
          >
            <Search sx={{ color: "var(--secondary-color)" }} />
            <InputBase
              placeholder="Search for tutors, study groups..."
              sx={{ ml: 1, flex: 1, fontSize: "0.9rem" }}
              inputProps={{ "aria-label": "Search for tutors, study groups" }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {user ? (
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
                  aria-label="Go to profile"
                  component={Link}
                  href="/profile"
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
              href="/"
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

      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid var(--secondary-color)",
          borderRadius: "8px",
          px: 2,
          py: 0.5,
          mt: 1,
          mx: 2,
        }}
      >
        <Search sx={{ color: "var(--secondary-color)" }} />
        <InputBase
          placeholder="Search for tutors, study groups..."
          sx={{ ml: 1, flex: 1, fontSize: "0.9rem" }}
          inputProps={{ "aria-label": "Search for tutors, study groups" }}
        />
      </Box>

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
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    href="/profile"
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
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/study-group"
                onClick={() => setMenuOpen(false)}
                aria-label="Create a study group"
              >
                <ListItemIcon>
                  <Group />
                </ListItemIcon>
                <ListItemText primary="Create Study Group" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/book-tutor"
                onClick={() => setMenuOpen(false)}
                aria-label="Book a tutor"
              >
                <ListItemIcon>
                  <School />
                </ListItemIcon>
                <ListItemText primary="Book Tutor" />
              </ListItemButton>
            </ListItem>
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
