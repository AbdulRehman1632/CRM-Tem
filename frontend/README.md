# Flowdesk CRM — React + MUI Frontend

ClickUp jesi UI wala CRM dashboard, jo aapke MERN backend ke sath connect hone ke liye ready hai.

## Setup

```bash
npm install
npm run dev
```

App `http://localhost:5173` par khulega.

## Backend connect karna

1. `vite.config.js` mein `target: "http://localhost:5000"` ko apne Express server ke port se match karein.
2. `src/api/taskService.js` mein routes check karein — agar aapke Express routes `/api/tasks` ke ilawa kuch aur naam se hain (e.g. `/api/task`), to bas yahan URL badal dein.
3. Agar JWT auth use kar rahe hain, login ke baad `localStorage.setItem("token", yourToken)` set kar dein — `src/api/axios.js` khud attach kar dega.

Expected task shape (backend response), aap apna model isi ke mutabiq rakh sakte hain ya frontend adjust kar lenge:

```json
{
  "_id": "...",
  "title": "Follow up with client",
  "status": "todo" | "inProgress" | "review" | "done",
  "priority": "urgent" | "high" | "normal" | "low",
  "assignee": "Ayesha",
  "dueDate": "2026-09-22"
}
```

## Structure

```
src/
  api/            -> axios instance + task service (CRUD calls)
  components/
    layout/       -> Sidebar, Topbar, DashboardLayout
    tasks/        -> StatusChip, PriorityFlag, ListView, BoardView, FormDialog
  context/        -> TaskContext (state, agar backend na mile to demo data fallback)
  pages/          -> Dashboard, Tasks, ComingSoon (Contacts/Deals/Reports)
  theme/          -> MUI theme (ClickUp jesa purple palette)
```

## Notes

- Backend abhi na chal raha ho tab bhi UI demo data ke sath fully kaam karega — jaise hi Express server chalega, asal data automatically load ho jayega.
- Tasks page mein List aur Board (Kanban, drag-drop) dono views hain — ClickUp ki tarah.
- Contacts / Deals / Reports abhi placeholder hain — jab aap unka backend model bata dein, wahi pattern follow karke bana denge.
