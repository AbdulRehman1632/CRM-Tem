import { createContext, useContext, useEffect, useState, useCallback } from "react";
import * as taskService from "../api/taskService.js";

const TaskContext = createContext(null);

// Backend abhi connect na ho to UI khali na dikhe, isliye demo seed data
const demoTasks = [
  {
    _id: "demo-1",
    title: "Follow up with Al-Habib Traders",
    status: "todo",
    priority: "high",
    assignee: "Ayesha",
    dueDate: "2026-09-22",
  },
  {
    _id: "demo-2",
    title: "Send proposal to Zaman Textiles",
    status: "inProgress",
    priority: "urgent",
    assignee: "Bilal",
    dueDate: "2026-09-19",
  },
  {
    _id: "demo-3",
    title: "Review Q3 pipeline report",
    status: "review",
    priority: "normal",
    assignee: "Sara",
    dueDate: "2026-09-25",
  },
  {
    _id: "demo-4",
    title: "Onboard new client - Noor Enterprises",
    status: "done",
    priority: "low",
    assignee: "Ayesha",
    dueDate: "2026-09-15",
  },
];

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingDemoData, setUsingDemoData] = useState(false);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await taskService.getTasks();
      setTasks(Array.isArray(data) ? data : data?.tasks ?? []);
      setUsingDemoData(false);
    } catch (err) {
      // Backend abhi available nahi - demo data dikha dete hain
      setTasks(demoTasks);
      setUsingDemoData(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (payload) => {
    if (usingDemoData) {
      setTasks((prev) => [{ ...payload, _id: `demo-${Date.now()}` }, ...prev]);
      return;
    }
    const created = await taskService.createTask(payload);
    setTasks((prev) => [created, ...prev]);
  };

  const editTask = async (id, payload) => {
    if (usingDemoData) {
      setTasks((prev) => prev.map((t) => (t._id === id ? { ...t, ...payload } : t)));
      return;
    }
    const updated = await taskService.updateTask(id, payload);
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
  };

  const removeTask = async (id) => {
    if (usingDemoData) {
      setTasks((prev) => prev.filter((t) => t._id !== id));
      return;
    }
    await taskService.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const changeStatus = (id, status) => editTask(id, { status });

  return (
    <TaskContext.Provider
      value={{ tasks, loading, usingDemoData, addTask, editTask, removeTask, changeStatus, refetch: fetchTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
