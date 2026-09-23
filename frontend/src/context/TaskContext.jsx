// import { createContext, useContext, useEffect, useState, useCallback } from "react";
// import * as taskService from "../api/taskService.js";

// const TaskContext = createContext(null);

// // Backend abhi connect na ho to UI khali na dikhe, isliye demo seed data
// const demoTasks = [
//   {
//     _id: "demo-1",
//     title: "Follow up with Al-Habib Traders",
//     status: "todo",
//     priority: "high",
//     assignee: "Ayesha",
//     dueDate: "2026-09-22",
//   },
//   {
//     _id: "demo-2",
//     title: "Send proposal to Zaman Textiles",
//     status: "inProgress",
//     priority: "urgent",
//     assignee: "Bilal",
//     dueDate: "2026-09-19",
//   },
//   {
//     _id: "demo-3",
//     title: "Review Q3 pipeline report",
//     status: "review",
//     priority: "normal",
//     assignee: "Sara",
//     dueDate: "2026-09-25",
//   },
//   {
//     _id: "demo-4",
//     title: "Onboard new client - Noor Enterprises",
//     status: "done",
//     priority: "low",
//     assignee: "Ayesha",
//     dueDate: "2026-09-15",
//   },
// ];

// export function TaskProvider({ children }) {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [usingDemoData, setUsingDemoData] = useState(false);

//   const fetchTasks = useCallback(async () => {
//     setLoading(true);
//     try {
//       const data = await taskService.getTasks();
//       setTasks(Array.isArray(data) ? data : data?.tasks ?? []);
//       setUsingDemoData(false);
//     } catch (err) {
//       // Backend abhi available nahi - demo data dikha dete hain
//       setTasks(demoTasks);
//       setUsingDemoData(true);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchTasks();
//   }, [fetchTasks]);

//   const addTask = async (payload) => {
//     if (usingDemoData) {
//       setTasks((prev) => [{ ...payload, _id: `demo-${Date.now()}` }, ...prev]);
//       return;
//     }
//     const created = await taskService.createTask(payload);
//     setTasks((prev) => [created, ...prev]);
//   };

//   const editTask = async (id, payload) => {
//     if (usingDemoData) {
//       setTasks((prev) => prev.map((t) => (t._id === id ? { ...t, ...payload } : t)));
//       return;
//     }
//     const updated = await taskService.updateTask(id, payload);
//     setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
//   };

//   const removeTask = async (id) => {
//     if (usingDemoData) {
//       setTasks((prev) => prev.filter((t) => t._id !== id));
//       return;
//     }
//     await taskService.deleteTask(id);
//     setTasks((prev) => prev.filter((t) => t._id !== id));
//   };

//   const changeStatus = (id, status) => editTask(id, { status });

//   return (
//     <TaskContext.Provider
//       value={{ tasks, loading, usingDemoData, addTask, editTask, removeTask, changeStatus, refetch: fetchTasks }}
//     >
//       {children}
//     </TaskContext.Provider>
//   );
// }

// export const useTasks = () => useContext(TaskContext);
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../api/axios";

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [boards, setBoards] = useState([]);
  const [activeSpaceId, setActiveSpaceId] = useState(""); // Dynamic Space Tracking
  const [activeBoardId, setActiveBoardId] = useState("");
  const [activeListId, setActiveListId] = useState("");
  const [loading, setLoading] = useState(false);

  // Express Backend se Specific Space ke Boards fetch karne ka function
  const fetchBoards = useCallback(async (spaceIdToFetch) => {
    const targetSpaceId = spaceIdToFetch || activeSpaceId;
    const token = localStorage.getItem("token");

    // Clear board view if no active space is selected or token is missing
    if (!token || !targetSpaceId) {
      setBoards([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // Send spaceId in Query String for complete Space Isolation
      const { data } = await api.get(`/boards?spaceId=${targetSpaceId}`);
      setBoards(data || []);
      
      if (data && data.length > 0) {
        setActiveBoardId(data[0]._id);
        if (data[0].lists && data[0].lists.length > 0) {
          setActiveListId(data[0].lists[0]._id);
        }
      } else {
        setActiveBoardId("");
        setActiveListId("");
      }
    } catch (err) {
      console.error("Backend se data lane mein masla aya:", err);
      setBoards([]);
    } finally {
      setLoading(false);
    }
  }, [activeSpaceId]);

  // Handle activeSpaceId change dynamically
  useEffect(() => {
    if (activeSpaceId) {
      fetchBoards(activeSpaceId);
    }
  }, [activeSpaceId, fetchBoards]);

  const activeBoard = boards.find((b) => b._id === activeBoardId);
  const activeSubList = activeBoard?.lists?.find((l) => l._id === activeListId);

  // Backend Item fields ko UI ki zarurat ke hisab se map karna
  const mapItemToTask = (item) => {
    let mappedStatus = "todo";
    const statusLower = (item.status || "").toLowerCase();
    
    if (statusLower.includes("progress")) mappedStatus = "inProgress";
    else if (statusLower.includes("review")) mappedStatus = "review";
    else if (statusLower.includes("completed") || statusLower.includes("done")) mappedStatus = "done";

    return {
      _id: item._id,
      title: item.name || "Untitled Task",
      status: mappedStatus,
      rawStatus: item.status || "Pending",
      priority: item.priority || "normal",
      assignee: item.email || item.name || "Unassigned",
      dueDate: item.dueDate || "",
      phone: item.phone || "",
      comments: item.comments || "",
      customData: item.customData || {},
      originalItem: item,
    };
  };

  const tasks = (activeSubList?.items || []).map(mapItemToTask);
  const allTasks = boards.flatMap((b) =>
    (b.lists || []).flatMap((l) => (l.items || []).map(mapItemToTask))
  );

  // Backend APIs ke sath Task Add Function
  // const addTask = async (payload) => {
  //   const currentSpace = payload.spaceId || activeSpaceId;
  //   if (!activeBoardId || !activeListId) return;

  //   const itemData = {
  //     name: payload.title,
  //     email: payload.assignee || "",
  //     status: payload.status === "IN PROGRESS" ? "In Progress" : payload.status === "COMPLETE" ? "Completed" : "Pending",
  //     comments: payload.description || payload.comments || "",
  //     phone: payload.phone || "",
  //     customData: payload.customData || {},
  //     priority: payload.priority || "Normal",
  //     dueDate: payload.dueDate || ""
  //   };
    
  //   try {
  //     const { data } = await api.post(
  //       `/boards/${activeBoardId}/lists/${activeListId}/items`,
  //       itemData
  //     );
  //     setBoards((prev) => prev.map((b) => (b._id === activeBoardId ? data : b)));
  //   } catch (err) {
  //     console.error("Task Add fail hua:", err);
  //   }
  // };


  const addTask = async (payload) => {
    // Current Active Space ID verify karein
    const spaceIdToUse = payload.spaceId || activeSpaceId;

    if (!activeBoardId || !activeListId) {
      console.error("Board ya List select nahi hai!");
      return;
    }

    const itemData = {
      name: payload.title,
      email: payload.assignee || "",
      status: payload.status === "inProgress" ? "In Progress" : payload.status === "done" ? "Completed" : "Pending",
      comments: payload.comments || "",
      phone: payload.phone || "",
      customData: payload.customData || {},
      spaceId: spaceIdToUse 
    };
    
    try {
      const { data } = await api.post(
        `/boards/${activeBoardId}/lists/${activeListId}/items`,
        itemData
      );
      
      // Board ko state mein update karein
      setBoards((prev) => prev.map((b) => (b._id === activeBoardId ? data : b)));
    } catch (err) {
      console.error("Task Add fail hua:", err);
    }
  };

  const editTask = async (id, payload) => {
    await fetchBoards();
  };

  const removeTask = async (id) => {
    await fetchBoards();
  };

  const changeStatus = async (id, newStatus) => {
    await editTask(id, { status: newStatus });
  };

  return (
    <TaskContext.Provider
      value={{
        boards,
        activeSpaceId,
        setActiveSpaceId, // Call this when navigating to different spaces
        activeBoard,
        activeSubList,
        activeBoardId,
        setActiveBoardId,
        activeListId,
        setActiveListId,
        tasks,
        allTasks,
        loading,
        addTask,
        editTask,
        removeTask,
        changeStatus,
        refetch: fetchBoards,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);