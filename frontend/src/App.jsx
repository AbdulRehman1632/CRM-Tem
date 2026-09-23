// import { Routes, Route } from "react-router-dom";
// import DashboardLayout from "./components/layout/DashboardLayout.jsx";
// import Dashboard from "./pages/Dashboard.jsx";
// import Tasks from "./pages/Tasks.jsx";
// import ComingSoon from "./pages/ComingSoon.jsx";
// import { TaskProvider } from "./context/TaskContext.jsx";

// export default function App() {
//   return (
//     <TaskProvider>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <DashboardLayout title="Dashboard">
//               <Dashboard />
//             </DashboardLayout>
//           }
//         />
//         <Route
//           path="/tasks"
//           element={
//             <DashboardLayout title="Tasks">
//               <Tasks />
//             </DashboardLayout>
//           }
//         />
//         <Route
//           path="/contacts"
//           element={
//             <DashboardLayout title="Contacts">
//               <ComingSoon title="Contacts" />
//             </DashboardLayout>
//           }
//         />
//         <Route
//           path="/deals"
//           element={
//             <DashboardLayout title="Deals">
//               <ComingSoon title="Deals" />
//             </DashboardLayout>
//           }
//         />
//         <Route
//           path="/reports"
//           element={
//             <DashboardLayout title="Reports">
//               <ComingSoon title="Reports" />
//             </DashboardLayout>
//           }
//         />
//       </Routes>
//     </TaskProvider>
//   );
// }

import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Tasks from "./pages/Tasks.jsx";
import ComingSoon from "./pages/ComingSoon.jsx";
// import Login from "./pages/Login/Login.jsx";
// import Signup from "./pages/Signup/Signup.jsx";
// import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";
import ProtectedRoute from "./Utils/Constant/ProtectedRoute/ProtectedRoute.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";

export default function App() {
  return (
    <TaskProvider>
      <Routes>
        {/* Public Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Application Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout title="Dashboard">
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <DashboardLayout title="Tasks">
                <Tasks />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/contacts"
          element={
            <ProtectedRoute>
              <DashboardLayout title="Contacts">
                <ComingSoon title="Contacts" />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/deals"
          element={
            <ProtectedRoute>
              <DashboardLayout title="Deals">
                <ComingSoon title="Deals" />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <DashboardLayout title="Reports">
                <ComingSoon title="Reports" />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </TaskProvider>
  );
}