import { Box, Tooltip } from "@mui/material";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";

export const PRIORITY_META = {
  urgent: { label: "Urgent", color: "#F45C5C" },
  high: { label: "High", color: "#FDAB3D" },
  normal: { label: "Normal", color: "#4A90E2" },
  low: { label: "Low", color: "#A0A0B2" },
};

export default function PriorityFlag({ priority }) {
  const meta = PRIORITY_META[priority] ?? PRIORITY_META.normal;
  return (
    <Tooltip title={meta.label}>
      <Box sx={{ display: "inline-flex", alignItems: "center" }}>
        <FlagRoundedIcon sx={{ fontSize: 18, color: meta.color }} />
      </Box>
    </Tooltip>
  );
}
