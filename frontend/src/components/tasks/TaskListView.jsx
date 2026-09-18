import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Avatar,
  Typography,
  IconButton,
  Box,
  Paper,
} from "@mui/material";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import StatusChip from "./StatusChip.jsx";
import PriorityFlag from "./PriorityFlag.jsx";
import { useTasks } from "../../context/TaskContext.jsx";

function initials(name = "") {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TaskListView({ tasks, onEdit }) {
  const { removeTask } = useTasks();

  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden" }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "#FAFAFC" }}>
            <TableCell padding="checkbox" />
            <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>Task name</TableCell>
            <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>Priority</TableCell>
            <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>Assignee</TableCell>
            <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>Due date</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task._id}
              hover
              onClick={() => onEdit(task)}
              sx={{ cursor: "pointer", "&:last-child td": { borderBottom: 0 } }}
            >
              <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                <Checkbox size="small" checked={task.status === "done"} />
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{
                    textDecoration: task.status === "done" ? "line-through" : "none",
                    color: task.status === "done" ? "text.secondary" : "text.primary",
                  }}
                >
                  {task.title}
                </Typography>
              </TableCell>
              <TableCell>
                <StatusChip status={task.status} />
              </TableCell>
              <TableCell>
                <PriorityFlag priority={task.priority} />
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar sx={{ width: 24, height: 24, fontSize: 11, bgcolor: "primary.light" }}>
                    {initials(task.assignee)}
                  </Avatar>
                  <Typography variant="body2" color="text.secondary">
                    {task.assignee || "Unassigned"}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {task.dueDate || "-"}
                </Typography>
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()} align="right">
                <IconButton size="small" onClick={() => removeTask(task._id)}>
                  <DeleteOutlineRoundedIcon fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <MoreHorizRoundedIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {tasks.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                <Typography color="text.secondary">Koi task nahi mila. "New Task" se add karein.</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}
