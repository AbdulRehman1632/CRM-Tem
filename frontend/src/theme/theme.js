import { createTheme } from "@mui/material/styles";

// ClickUp-jesa purple accent + neutral off-white surface
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#7B68EE", // ClickUp signature purple
      dark: "#5B4FCF",
      light: "#9C8FFF",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#02BCD4",
    },
    background: {
      default: "#F9F9FB",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1A1A2E",
      secondary: "#6B6B7B",
    },
    success: { main: "#00C875" },
    warning: { main: "#FDAB3D" },
    error: { main: "#F45C5C" },
    divider: "#EAEAF0",
    status: {
      todo: "#A0A0B2",
      inProgress: "#4A90E2",
      review: "#FDAB3D",
      done: "#00C875",
    },
    priority: {
      urgent: "#F45C5C",
      high: "#FDAB3D",
      normal: "#4A90E2",
      low: "#A0A0B2",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
    h1: { fontWeight: 700, fontSize: "1.9rem" },
    h2: { fontWeight: 700, fontSize: "1.5rem" },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 6, boxShadow: "none" },
        containedPrimary: {
          "&:hover": { boxShadow: "none" },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, fontSize: "0.72rem" },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid #EAEAF0",
        },
      },
    },
  },
});

export default theme;
