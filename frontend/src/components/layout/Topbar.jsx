import { AppBar, Toolbar, InputBase, Box, IconButton, Avatar, Badge, Typography } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

export default function Topbar({ title }) {
  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" sx={{ flexShrink: 0 }}>
          {title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#F2F2F7",
            borderRadius: 2,
            px: 1.5,
            py: 0.6,
            ml: 2,
            flex: 1,
            maxWidth: 420,
          }}
        >
          <SearchRoundedIcon sx={{ color: "text.secondary", fontSize: 20, mr: 1 }} />
          <InputBase placeholder="Search tasks, contacts, deals..." fullWidth sx={{ fontSize: 14 }} />
        </Box>

        <Box sx={{ flex: 1 }} />

        <IconButton
          sx={{
            bgcolor: "primary.main",
            color: "#fff",
            borderRadius: 1.5,
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          <AddRoundedIcon fontSize="small" />
        </IconButton>

        <IconButton>
          <Badge color="error" variant="dot">
            <NotificationsNoneRoundedIcon sx={{ color: "text.secondary" }} />
          </Badge>
        </IconButton>

        <Avatar sx={{ width: 34, height: 34, bgcolor: "secondary.main", fontSize: 14 }}>MA</Avatar>
      </Toolbar>
    </AppBar>
  );
}
