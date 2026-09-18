import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Tasks from "./pages/Tasks.jsx";
import ComingSoon from "./pages/ComingSoon.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";

export default function App() {
  return (
    <TaskProvider>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout title="Dashboard">
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/tasks"
          element={
            <DashboardLayout title="Tasks">
              <Tasks />
            </DashboardLayout>
          }
        />
        <Route
          path="/contacts"
          element={
            <DashboardLayout title="Contacts">
              <ComingSoon title="Contacts" />
            </DashboardLayout>
          }
        />
        <Route
          path="/deals"
          element={
            <DashboardLayout title="Deals">
              <ComingSoon title="Deals" />
            </DashboardLayout>
          }
        />
        <Route
          path="/reports"
          element={
            <DashboardLayout title="Reports">
              <ComingSoon title="Reports" />
            </DashboardLayout>
          }
        />
      </Routes>
    </TaskProvider>
  );
}
