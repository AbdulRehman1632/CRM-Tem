import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Stack,
  Grid,
} from "@mui/material";
import { useTasks } from "../../context/TaskContext.jsx";

const emptyForm = {
  title: "",
  status: "todo",
  priority: "normal",
  assignee: "",
  dueDate: "",
};

export default function TaskFormDialog({ open, onClose, initialTask }) {
  const { addTask, editTask } = useTasks();
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialTask) {
      setForm({
        title: initialTask.title ?? "",
        status: initialTask.status ?? "todo",
        priority: initialTask.priority ?? "normal",
        assignee: initialTask.assignee ?? "",
        dueDate: initialTask.dueDate ?? "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialTask, open]);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      if (initialTask) {
        await editTask(initialTask._id, form);
      } else {
        await addTask(form);
      }
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle fontWeight={700}>{initialTask ? "Edit Task" : "New Task"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2.2} sx={{ mt: 0.5 }}>
          <TextField
            label="Task title"
            placeholder="e.g. Call up client about renewal"
            value={form.title}
            onChange={handleChange("title")}
            autoFocus
            fullWidth
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField select label="Status" fullWidth value={form.status} onChange={handleChange("status")}>
                <MenuItem value="todo">To Do</MenuItem>
                <MenuItem value="inProgress">In Progress</MenuItem>
                <MenuItem value="review">In Review</MenuItem>
                <MenuItem value="done">Done</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField select label="Priority" fullWidth value={form.priority} onChange={handleChange("priority")}>
                <MenuItem value="urgent">Urgent</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Assignee"
                placeholder="e.g. Ayesha"
                fullWidth
                value={form.assignee}
                onChange={handleChange("assignee")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Due date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={form.dueDate}
                onChange={handleChange("dueDate")}
              />
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={saving}>
          {initialTask ? "Save changes" : "Create task"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
