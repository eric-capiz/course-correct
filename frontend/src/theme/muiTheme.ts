import { alpha, createTheme } from "@mui/material/styles";
import { ccTokens, primaryHover } from "./tokens";

export const courseCorrectTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: ccTokens.bloom,
      light: "#67e8f9",
      dark: "#0891b2",
      contrastText: ccTokens.voidDeep,
    },
    secondary: {
      main: ccTokens.violet,
      contrastText: ccTokens.chrome,
    },
    error: {
      main: ccTokens.rose,
    },
    warning: {
      main: ccTokens.gold,
    },
    success: {
      main: ccTokens.mint,
    },
    background: {
      default: ccTokens.voidDeep,
      paper: alpha(ccTokens.elevated, 0.92),
    },
    text: {
      primary: ccTokens.chrome,
      secondary: ccTokens.muted,
      disabled: alpha(ccTokens.chrome, 0.38),
    },
    divider: alpha("#ffffff", 0.1),
    action: {
      hover: alpha(ccTokens.bloom, 0.08),
      selected: alpha(ccTokens.bloom, 0.14),
      disabled: alpha(ccTokens.chrome, 0.28),
      disabledBackground: alpha("#ffffff", 0.08),
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
    fontWeightBold: 800,
    h4: {
      fontWeight: 800,
      letterSpacing: "-0.03em",
    },
    h5: {
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    h6: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    button: {
      fontWeight: 700,
      textTransform: "none",
      letterSpacing: "0.02em",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: "smooth",
        },
        body: {
          backgroundColor: ccTokens.voidDeep,
          backgroundImage: `
            radial-gradient(ellipse 120% 80% at 50% -20%, ${alpha(ccTokens.bloom, 0.12)}, transparent 50%),
            radial-gradient(ellipse 80% 50% at 100% 0%, ${alpha(ccTokens.violet, 0.08)}, transparent 45%)
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
          backdropFilter: "blur(18px) saturate(150%)",
          WebkitBackdropFilter: "blur(18px) saturate(150%)",
          border: `1px solid ${ccTokens.line}`,
          boxShadow: `
            inset 0 1px 0 ${alpha("#fff", 0.06)},
            0 18px 60px rgba(0, 0, 0, 0.45)
          `,
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
          backgroundColor: alpha(ccTokens.voidDeep, 0.72),
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
          borderBottom: `1px solid ${ccTokens.line}`,
          boxShadow: "none",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: alpha(ccTokens.elevated, 0.98),
          backdropFilter: "blur(16px)",
          borderLeft: `1px solid ${ccTokens.line}`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          boxShadow: `0 0 28px ${alpha(ccTokens.bloom, 0.35)}`,
          "&:hover": {
            boxShadow: `0 0 36px ${alpha(ccTokens.bloom, 0.45)}`,
            backgroundColor: primaryHover,
          },
        },
        outlinedPrimary: {
          borderColor: alpha(ccTokens.bloom, 0.55),
          "&:hover": {
            borderColor: ccTokens.bloom,
            backgroundColor: alpha(ccTokens.bloom, 0.08),
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: 3,
          background: `linear-gradient(90deg, ${ccTokens.bloom}, ${ccTokens.violet})`,
          boxShadow: `0 0 16px ${alpha(ccTokens.bloom, 0.4)}`,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          "&.Mui-selected": {
            color: ccTokens.chrome,
            textShadow: `0 0 24px ${alpha(ccTokens.bloom, 0.35)}`,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        outlined: {
          borderColor: alpha(ccTokens.bloom, 0.35),
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: alpha(ccTokens.elevated, 0.97),
          border: `1px solid ${ccTokens.line}`,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        standardError: {
          backgroundColor: alpha(ccTokens.rose, 0.12),
          color: ccTokens.chrome,
          border: `1px solid ${alpha(ccTokens.rose, 0.35)}`,
        },
        standardSuccess: {
          backgroundColor: alpha(ccTokens.mint, 0.1),
          color: ccTokens.chrome,
          border: `1px solid ${alpha(ccTokens.mint, 0.35)}`,
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            background: `linear-gradient(135deg, ${alpha(ccTokens.bloom, 0.35)}, ${alpha(ccTokens.violet, 0.25)})`,
            color: ccTokens.chrome,
          },
        },
      },
    },
  },
});
