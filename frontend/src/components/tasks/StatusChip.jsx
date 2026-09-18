import { Chip } from "@mui/material";

export const STATUS_META = {
  todo: { label: "To Do", color: "#A0A0B2" },
  inProgress: { label: "In Progress", color: "#4A90E2" },
  review: { label: "In Review", color: "#FDAB3D" },
  done: { label: "Done", color: "#00C875" },
};

export default function StatusChip({ status, ...props }) {
  const meta = STATUS_META[status] ?? STATUS_META.todo;
  return (
    <Chip
      size="small"
      label={meta.label}
      sx={{
        bgcolor: `${meta.color}1F`,
        color: meta.color,
        fontWeight: 700,
        borderRadius: 1,
      }}
      {...props}
    />
  );
}
