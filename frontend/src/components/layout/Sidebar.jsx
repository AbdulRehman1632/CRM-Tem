import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Divider,
  Chip,
} from "@mui/material";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import ChecklistRtlRoundedIcon from "@mui/icons-material/ChecklistRtlRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useLocation, useNavigate } from "react-router-dom";

const DRAWER_WIDTH = 248;

const navItems = [
  { label: "Dashboard", icon: <SpaceDashboardRoundedIcon />, path: "/" },
  { label: "Tasks", icon: <ChecklistRtlRoundedIcon />, path: "/tasks" },
  { label: "Contacts", icon: <PeopleAltRoundedIcon />, path: "/contacts" },
  { label: "Deals", icon: <BusinessCenterRoundedIcon />, path: "/deals" },
  { label: "Reports", icon: <InsightsRoundedIcon />, path: "/reports" },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Workspace header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, px: 2, py: 2 }}>
        <Avatar
          variant="rounded"
          sx={{ bgcolor: "primary.main", width: 32, height: 32, fontSize: 14, fontWeight: 700 }}
        >
          FD
        </Avatar>
        <Typography variant="subtitle1" fontWeight={700} noWrap>
          Flowdesk CRM
        </Typography>
      </Box>

      <Divider />

      <List sx={{ px: 1.2, py: 1.5 }}>
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.path}
              selected={active}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 1.5,
                mb: 0.4,
                color: active ? "primary.main" : "text.secondary",
                "&.Mui-selected": {
                  bgcolor: "rgba(123,104,238,0.10)",
                  "&:hover": { bgcolor: "rgba(123,104,238,0.16)" },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 34, color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 14, fontWeight: active ? 700 : 500 }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Divider sx={{ mx: 1.5 }} />

      {/* Spaces section - ClickUp jesa "Spaces" grouping */}
      <Box sx={{ px: 2, pt: 2, pb: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="caption" fontWeight={700} color="text.secondary">
          SPACES
        </Typography>
        <AddRoundedIcon sx={{ fontSize: 16, color: "text.secondary", cursor: "pointer" }} />
      </Box>
      <List sx={{ px: 1.2 }}>
        {["Sales Pipeline", "Support Desk", "Marketing"].map((space, i) => (
          <ListItemButton key={space} sx={{ borderRadius: 1.5, mb: 0.3 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: ["#4A90E2", "#00C875", "#FDAB3D"][i],
                mr: 1.4,
                ml: 0.5,
              }}
            />
            <ListItemText primary={space} primaryTypographyProps={{ fontSize: 13.5 }} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ mt: "auto", p: 2 }}>
        <Chip
          label="Upgrade to Pro"
          color="primary"
          size="small"
          sx={{ width: "100%", py: 2, fontWeight: 700 }}
        />
      </Box>
    </Drawer>
  );
}
