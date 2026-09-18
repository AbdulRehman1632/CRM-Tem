import { Box, Typography, Paper } from "@mui/material";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";

export default function ComingSoon({ title }) {
  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 3 }}>
        {title}
      </Typography>
      <Paper
        variant="outlined"
        sx={{
          borderRadius: 2.5,
          p: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <ConstructionRoundedIcon sx={{ fontSize: 40, color: "primary.main" }} />
        <Typography variant="h6">Ye module abhi banaya ja raha hai</Typography>
        <Typography color="text.secondary">
          {title} ka UI aapki zarurat ke mutabiq agle step mein add kar dete hain.
        </Typography>
      </Paper>
    </Box>
  );
}
