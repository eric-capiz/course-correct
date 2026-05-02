import { alpha, createTheme } from "@mui/material/styles";
import { ivyTokens as t, primaryHover } from "./tokens";

export const courseCorrectTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: t.gold,
      light: t.goldBright,
      dark: t.goldBurnished,
      contrastText: t.midnight,
    },
    secondary: {
      main: t.oxford,
      light: "#2a5588",
      dark: "#001428",
      contrastText: t.ivory,
    },
    error: {
      main: "#c45c6a",
    },
    warning: {
      main: t.goldBright,
    },
    success: {
      main: "#6b9b7a",
    },
    info: {
      main: t.moonInk,
    },
    background: {
      default: t.midnight,
      paper: t.parchment,
    },
    text: {
      primary: t.ivory,
      secondary: t.verseMuted,
      disabled: alpha(t.ivory, 0.38),
    },
    divider: alpha(t.gold, 0.22),
    action: {
      hover: alpha(t.gold, 0.08),
      selected: alpha(t.gold, 0.18),
      disabled: alpha(t.ivory, 0.28),
      disabledBackground: alpha("#fff", 0.06),
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: '"Source Serif 4", "Georgia", "Times New Roman", serif',
    fontWeightBold: 700,
    h1: {
      fontFamily: '"Cormorant Garamond", "Georgia", serif',
      fontWeight: 600,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontFamily: '"Cormorant Garamond", "Georgia", serif',
      fontWeight: 600,
      letterSpacing: "-0.02em",
    },
    h3: {
      fontFamily: '"Cormorant Garamond", "Georgia", serif',
      fontWeight: 600,
      letterSpacing: "-0.02em",
    },
    h4: {
      fontFamily: '"Cormorant Garamond", "Georgia", serif',
      fontWeight: 600,
      letterSpacing: "-0.03em",
    },
    h5: {
      fontFamily: '"Cormorant Garamond", "Georgia", serif',
      fontWeight: 600,
      letterSpacing: "-0.02em",
    },
    h6: {
      fontFamily: '"Cormorant Garamond", "Georgia", serif',
      fontWeight: 600,
      letterSpacing: "-0.02em",
    },
    subtitle1: {
      fontFamily: '"Cormorant Garamond", "Georgia", serif',
      fontWeight: 500,
    },
    subtitle2: {
      fontFamily: '"Cormorant Garamond", "Georgia", serif',
      fontWeight: 500,
    },
    body1: {
      fontSize: "1.0625rem",
      lineHeight: 1.75,
    },
    body2: {
      lineHeight: 1.7,
    },
    button: {
      fontFamily: '"Source Serif 4", "Georgia", serif',
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: "0.06em",
    },
    caption: {
      letterSpacing: "0.04em",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: "smooth",
        },
        body: {
          backgroundColor: t.midnight,
          backgroundImage: `
            radial-gradient(ellipse 120% 70% at 50% -15%, ${alpha(t.gold, 0.09)}, transparent 52%),
            radial-gradient(ellipse 80% 45% at 100% 0%, ${alpha(t.oxford, 0.35)}, transparent 48%),
            radial-gradient(ellipse 60% 40% at 0% 100%, ${alpha(t.goldBurnished, 0.06)}, transparent 50%)
          `,
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: t.parchment,
          color: t.ink,
          border: `1px solid ${alpha(t.gold, 0.28)}`,
          boxShadow: `${t.shadowLift}, inset 0 1px 0 ${alpha("#fff", 0.65)}`,
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        color: "transparent",
      },
      styleOverrides: {
        root: {
          background: `linear-gradient(180deg, ${alpha(t.panel, 0.97)} 0%, ${alpha(t.midnight, 0.92)} 100%)`,
          backdropFilter: "blur(20px) saturate(140%)",
          WebkitBackdropFilter: "blur(20px) saturate(140%)",
          borderBottom: `1px solid ${t.ruleHair}`,
          boxShadow: `inset 0 -1px 0 ${alpha(t.gold, 0.12)}`,
          color: t.ivory,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: `linear-gradient(180deg, ${alpha(t.oxford, 0.55)}, ${alpha(t.panel, 0.99)})`,
          backdropFilter: "blur(18px)",
          borderLeft: `1px solid ${t.ruleHair}`,
          color: t.ivory,
          boxShadow: `-12px 0 48px rgba(0,0,0,0.45)`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          boxShadow: `0 4px 24px ${alpha(t.gold, 0.35)}`,
          "&:hover": {
            boxShadow: `0 6px 32px ${alpha(t.gold, 0.42)}`,
            backgroundColor: primaryHover,
          },
        },
        outlinedPrimary: {
          borderColor: alpha(t.gold, 0.55),
          color: t.ivory,
          "&:hover": {
            borderColor: t.goldBright,
            backgroundColor: alpha(t.gold, 0.08),
          },
        },
        textPrimary: {
          color: t.goldBright,
          "&:hover": {
            backgroundColor: alpha(t.gold, 0.08),
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: 3,
          background: `linear-gradient(90deg, ${t.goldBurnished}, ${t.goldBright})`,
          boxShadow: `0 0 14px ${alpha(t.gold, 0.45)}`,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          "&.Mui-selected": {
            color: t.ivory,
            textShadow: `0 0 28px ${alpha(t.gold, 0.35)}`,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        outlined: {
          borderColor: alpha(t.gold, 0.45),
          "& .MuiChip-icon": {
            color: t.gold,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: t.parchment,
          color: t.ink,
          border: `1px solid ${alpha(t.gold, 0.35)}`,
          boxShadow: `${t.shadowLift}, inset 0 1px 0 ${alpha("#fff", 0.7)}`,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        standardError: {
          backgroundColor: alpha("#c45c6a", 0.12),
          color: t.ivory,
          border: `1px solid ${alpha("#c45c6a", 0.45)}`,
        },
        standardSuccess: {
          backgroundColor: alpha("#6b9b7a", 0.12),
          color: t.ivory,
          border: `1px solid ${alpha("#6b9b7a", 0.4)}`,
        },
        standardInfo: {
          backgroundColor: alpha(t.oxford, 0.25),
          color: t.ivory,
          border: `1px solid ${alpha(t.gold, 0.35)}`,
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          fontFamily: '"Source Serif 4", serif',
          "&.Mui-selected": {
            background: `linear-gradient(135deg, ${alpha(t.gold, 0.45)}, ${alpha(t.goldBurnished, 0.35)})`,
            color: t.midnight,
            fontWeight: 700,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(t.ink, 0.22),
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha(t.gold, 0.45),
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: t.gold,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: t.goldBurnished,
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: t.parchment,
          color: t.ink,
          border: `1px solid ${alpha(t.gold, 0.3)}`,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: t.goldBright,
        },
      },
    },
  },
});
