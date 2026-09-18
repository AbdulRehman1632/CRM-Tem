import { useMemo, useState } from "react";
import { Box, Button, ToggleButtonGroup, ToggleButton, TextField, MenuItem, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import ViewKanbanRoundedIcon from "@mui/icons-material/ViewKanbanRounded";
import TaskListView from "../components/tasks/TaskListView.jsx";
import TaskBoardView from "../components/tasks/TaskBoardView.jsx";
import TaskFormDialog from "../components/tasks/TaskFormDialog.jsx";
import { useTasks } from "../context/TaskContext.jsx";

export default function Tasks() {
  const { tasks, loading } = useTasks();
  const [view, setView] = useState("list");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTasks = useMemo(() => {
    if (statusFilter === "all") return tasks;
    return tasks.filter((t) => t.status === statusFilter);
  }, [tasks, statusFilter]);

  const openNewTask = () => {
    setEditingTask(null);
    setDialogOpen(true);
  };

  const openEditTask = (task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2.5, flexWrap: "wrap", gap: 1.5 }}>
        <Typography variant="h1">Tasks</Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
          <TextField
            select
            size="small"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="all">All statuses</MenuItem>
            <MenuItem value="todo">To Do</MenuItem>
            <MenuItem value="inProgress">In Progress</MenuItem>
            <MenuItem value="review">In Review</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </TextField>

          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(_, v) => v && setView(v)}
            size="small"
          >
            <ToggleButton value="list">
              <ViewListRoundedIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="board">
              <ViewKanbanRoundedIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>

          <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={openNewTask}>
            New Task
          </Button>
        </Box>
      </Box>

      {!loading && view === "list" && <TaskListView tasks={filteredTasks} onEdit={openEditTask} />}
      {!loading && view === "board" && <TaskBoardView tasks={filteredTasks} onEdit={openEditTask} />}

      <TaskFormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} initialTask={editingTask} />
    </Box>
  );
}
