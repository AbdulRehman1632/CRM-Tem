import { Box } from "@mui/material";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

export default function DashboardLayout({ title, children }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <Sidebar />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Topbar title={title} />
        <Box sx={{ p: 3, flex: 1 }}>{children}</Box>
      </Box>
    </Box>
  );
}
