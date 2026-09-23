// import {
//   Box,
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Typography,
//   Avatar,
//   Divider,
//   Chip,
// } from "@mui/material";
// import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
// import ChecklistRtlRoundedIcon from "@mui/icons-material/ChecklistRtlRounded";
// import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
// import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
// import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
// import AddRoundedIcon from "@mui/icons-material/AddRounded";
// import { useLocation, useNavigate } from "react-router-dom";

// const DRAWER_WIDTH = 248;

// const navItems = [
//   { label: "Dashboard", icon: <SpaceDashboardRoundedIcon />, path: "/" },
//   { label: "Tasks", icon: <ChecklistRtlRoundedIcon />, path: "/tasks" },
//   { label: "Contacts", icon: <PeopleAltRoundedIcon />, path: "/contacts" },
//   { label: "Deals", icon: <BusinessCenterRoundedIcon />, path: "/deals" },
//   { label: "Reports", icon: <InsightsRoundedIcon />, path: "/reports" },
// ];

// export default function Sidebar() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: DRAWER_WIDTH,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: DRAWER_WIDTH,
//           boxSizing: "border-box",
//           bgcolor: "background.paper",
//           display: "flex",
//           flexDirection: "column",
//         },
//       }}
//     >
//       {/* Workspace header */}
//       <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, px: 2, py: 2 }}>
//         <Avatar
//           variant="rounded"
//           sx={{ bgcolor: "primary.main", width: 32, height: 32, fontSize: 14, fontWeight: 700 }}
//         >
//           FD
//         </Avatar>
//         <Typography variant="subtitle1" fontWeight={700} noWrap>
//           Flowdesk CRM
//         </Typography>
//       </Box>

//       <Divider />

//       <List sx={{ px: 1.2, py: 1.5 }}>
//         {navItems.map((item) => {
//           const active = location.pathname === item.path;
//           return (
//             <ListItemButton
//               key={item.path}
//               selected={active}
//               onClick={() => navigate(item.path)}
//               sx={{
//                 borderRadius: 1.5,
//                 mb: 0.4,
//                 color: active ? "primary.main" : "text.secondary",
//                 "&.Mui-selected": {
//                   bgcolor: "rgba(123,104,238,0.10)",
//                   "&:hover": { bgcolor: "rgba(123,104,238,0.16)" },
//                 },
//               }}
//             >
//               <ListItemIcon sx={{ minWidth: 34, color: "inherit" }}>{item.icon}</ListItemIcon>
//               <ListItemText
//                 primary={item.label}
//                 primaryTypographyProps={{ fontSize: 14, fontWeight: active ? 700 : 500 }}
//               />
//             </ListItemButton>
//           );
//         })}
//       </List>

//       <Divider sx={{ mx: 1.5 }} />

//       {/* Spaces section - ClickUp jesa "Spaces" grouping */}
//       <Box sx={{ px: 2, pt: 2, pb: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//         <Typography variant="caption" fontWeight={700} color="text.secondary">
//           SPACES
//         </Typography>
//         <AddRoundedIcon sx={{ fontSize: 16, color: "text.secondary", cursor: "pointer" }} />
//       </Box>
//       <List sx={{ px: 1.2 }}>
//         {["Sales Pipeline", "Support Desk", "Marketing"].map((space, i) => (
//           <ListItemButton key={space} sx={{ borderRadius: 1.5, mb: 0.3 }}>
//             <Box
//               sx={{
//                 width: 8,
//                 height: 8,
//                 borderRadius: "50%",
//                 bgcolor: ["#4A90E2", "#00C875", "#FDAB3D"][i],
//                 mr: 1.4,
//                 ml: 0.5,
//               }}
//             />
//             <ListItemText primary={space} primaryTypographyProps={{ fontSize: 13.5 }} />
//           </ListItemButton>
//         ))}
//       </List>

//       {/* <Box sx={{ mt: "auto", p: 2 }}>
//         <Chip
//           label="Upgrade to Pro"
//           color="primary"
//           size="small"
//           sx={{ width: "100%", py: 2, fontWeight: 700 }}
//         />
//       </Box> */}
//     </Drawer>
//   );
// }


import React, { useEffect, useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  CircularProgress
} from "@mui/material";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import ChecklistRtlRoundedIcon from "@mui/icons-material/ChecklistRtlRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useLocation, useNavigate } from "react-router-dom";
import * as spaceService from "../../api/spaceService.js";
import { useTasks } from "../../context/TaskContext.jsx"; // <-- TaskContext import kia

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
  const { setActiveSpaceId, activeSpaceId } = useTasks(); // <-- Context se functions nikaale

  // Dynamic Spaces States
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [spaceName, setSpaceName] = useState("");
  const [spaceColor, setSpaceColor] = useState("#4A90E2");
  const [creating, setCreating] = useState(false);

  // Fetch Spaces on Mount
  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    try {
      const data = await spaceService.getSpaces();
      setSpaces(data);
      
      // Auto-select first space if none is selected
      if (data && data.length > 0 && !activeSpaceId) {
        setActiveSpaceId(data[0]._id);
      }
    } catch (err) {
      console.error("Failed to load spaces", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSpaceClick = (spaceId) => {
    setActiveSpaceId(spaceId); // 1. TaskContext update kia
    navigate(`/tasks?spaceId=${spaceId}`); // 2. Route change kia[cite: 8]
  };

  const handleCreateSpace = async (e) => {
    e.preventDefault();
    if (!spaceName.trim()) return;
    setCreating(true);
    try {
      const newSpace = await spaceService.createSpace({
        name: spaceName,
        color: spaceColor
      });
      setSpaces((prev) => [newSpace, ...prev]);
      setActiveSpaceId(newSpace._id); // Naya ban'ne wala space auto active ho jaye
      navigate(`/tasks?spaceId=${newSpace._id}`);
      setSpaceName("");
      setOpenModal(false);
    } catch (err) {
      console.error("Space creation failed", err);
    } finally {
      setCreating(false);
    }
  };

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
      {/* Workspace Header */}
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

      {/* Main Nav Items */}
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

      {/* Dynamic Spaces Header */}
      <Box sx={{ px: 2, pt: 2, pb: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="caption" fontWeight={700} color="text.secondary">
          SPACES
        </Typography>
        <IconButton size="small" onClick={() => setOpenModal(true)}>
          <AddRoundedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
        </IconButton>
      </Box>

      {/* Dynamic Space List from Backend */}
      <List sx={{ px: 1.2, flexGrow: 1, overflowY: "auto" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <CircularProgress size={20} />
          </Box>
        ) : spaces.length === 0 ? (
          <Typography variant="caption" color="text.secondary" sx={{ px: 2, display: "block" }}>
            No spaces created yet.
          </Typography>
        ) : (
          spaces.map((space) => {
            const isSelected = activeSpaceId === space._id;
            return (
              <ListItemButton
                key={space._id}
                selected={isSelected}
                onClick={() => handleSpaceClick(space._id)}
                sx={{
                  borderRadius: 1.5,
                  mb: 0.3,
                  "&.Mui-selected": {
                    bgcolor: "rgba(123,104,238,0.08)",
                    "&:hover": { bgcolor: "rgba(123,104,238,0.14)" },
                  },
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bgcolor: space.color || "#4A90E2",
                    mr: 1.4,
                    ml: 0.5,
                  }}
                />
                <ListItemText
                  primary={space.name}
                  primaryTypographyProps={{
                    fontSize: 13.5,
                    fontWeight: isSelected ? 700 : 500,
                    color: isSelected ? "primary.main" : "text.primary"
                  }}
                />
              </ListItemButton>
            );
          })
        )}
      </List>

      {/* Modal for Creating New Space */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="xs">
        <form onSubmit={handleCreateSpace}>
          <DialogTitle fontWeight={700}>Create New Space</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
              <TextField
                label="Space Name"
                placeholder="e.g. Sales Pipeline"
                value={spaceName}
                onChange={(e) => setSpaceName(e.target.value)}
                autoFocus
                required
                fullWidth
              />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Typography variant="body2">Theme Color:</Typography>
                <input
                  type="color"
                  value={spaceColor}
                  onChange={(e) => setSpaceColor(e.target.value)}
                  style={{ width: 40, height: 40, border: "none", cursor: "pointer", borderRadius: 4 }}
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setOpenModal(false)} color="inherit">
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={creating}>
              {creating ? "Creating..." : "Create Space"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Drawer>
  );
}