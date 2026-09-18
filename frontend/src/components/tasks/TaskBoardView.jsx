import { Box, Paper, Typography, Avatar, Chip } from "@mui/material";
import { STATUS_META } from "./StatusChip.jsx";
import PriorityFlag from "./PriorityFlag.jsx";
import { useTasks } from "../../context/TaskContext.jsx";

function initials(name = "") {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

const COLUMNS = ["todo", "inProgress", "review", "done"];

export default function TaskBoardView({ tasks, onEdit }) {
  const { changeStatus } = useTasks();

  const handleDrop = (e, status) => {
    const id = e.dataTransfer.getData("taskId");
    if (id) changeStatus(id, status);
  };

  return (
    <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 1 }}>
      {COLUMNS.map((col) => {
        const meta = STATUS_META[col];
        const colTasks = tasks.filter((t) => t.status === col);
        return (
          <Box
            key={col}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, col)}
            sx={{ minWidth: 280, flex: "0 0 280px" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.2, px: 0.5 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: meta.color }} />
              <Typography variant="subtitle2" fontWeight={700}>
                {meta.label}
              </Typography>
              <Chip label={colTasks.length} size="small" sx={{ height: 20, fontSize: 11 }} />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
              {colTasks.map((task) => (
                <Paper
                  key={task._id}
                  variant="outlined"
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData("taskId", task._id)}
                  onClick={() => onEdit(task)}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    cursor: "grab",
                    borderLeft: "3px solid",
                    borderLeftColor: meta.color,
                    "&:hover": { boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
                  }}
                >
                  <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
                    {task.title}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                      <PriorityFlag priority={task.priority} />
                      <Typography variant="caption" color="text.secondary">
                        {task.dueDate || "No date"}
                      </Typography>
                    </Box>
                    <Avatar sx={{ width: 22, height: 22, fontSize: 10, bgcolor: "primary.light" }}>
                      {initials(task.assignee)}
                    </Avatar>
                  </Box>
                </Paper>
              ))}
              {colTasks.length === 0 && (
                <Box
                  sx={{
                    border: "1px dashed",
                    borderColor: "divider",
                    borderRadius: 2,
                    p: 2,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Yahan drop karein
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
