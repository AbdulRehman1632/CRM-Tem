// import { Box, Grid, Paper, Typography, Avatar, LinearProgress } from "@mui/material";
// import ChecklistRtlRoundedIcon from "@mui/icons-material/ChecklistRtlRounded";
// import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
// import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
// import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
// import StatusChip from "../components/tasks/StatusChip.jsx";
// import PriorityFlag from "../components/tasks/PriorityFlag.jsx";
// import { useTasks } from "../context/TaskContext.jsx";

// const statCards = (tasks) => {
//   const total = tasks.length;
//   const done = tasks.filter((t) => t.status === "done").length;
//   const inProgress = tasks.filter((t) => t.status === "inProgress").length;
//   const overdue = tasks.filter((t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "done").length;

//   return [
//     { label: "Total Tasks", value: total, icon: <ChecklistRtlRoundedIcon />, color: "#7B68EE" },
//     { label: "Completed", value: done, icon: <CheckCircleRoundedIcon />, color: "#00C875" },
//     { label: "In Progress", value: inProgress, icon: <PendingActionsRoundedIcon />, color: "#4A90E2" },
//     { label: "Overdue", value: overdue, icon: <BusinessCenterRoundedIcon />, color: "#F45C5C" },
//   ];
// };

// export default function Dashboard() {
//   const { tasks, loading, usingDemoData } = useTasks();
//   const cards = statCards(tasks);
//   const total = tasks.length || 1;
//   const done = tasks.filter((t) => t.status === "done").length;

//   return (
//     <Box>
//       {usingDemoData && (
//         <Paper
//           variant="outlined"
//           sx={{ p: 1.5, mb: 2, borderRadius: 2, bgcolor: "#FFF8EA", borderColor: "#FDAB3D" }}
//         >
//           <Typography variant="body2" color="text.secondary">
//             Backend abhi connect nahi hai, isliye demo data dikhaya ja raha hai. Express server chalne par
//             asal data yahan aa jayega.
//           </Typography>
//         </Paper>
//       )}

//       <Typography variant="h1" sx={{ mb: 0.5 }}>
//         Welcome back 👋
//       </Typography>
//       <Typography color="text.secondary" sx={{ mb: 3 }}>
//         Aapki team ka aaj ka overview.
//       </Typography>

//       <Grid container spacing={2} sx={{ mb: 3 }}>
//         {cards.map((c) => (
//           <Grid item xs={12} sm={6} md={3} key={c.label}>
//             <Paper variant="outlined" sx={{ p: 2.2, borderRadius: 2.5 }}>
//               <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
//                 <Avatar sx={{ bgcolor: `${c.color}1F`, color: c.color, width: 38, height: 38 }}>
//                   {c.icon}
//                 </Avatar>
//               </Box>
//               <Typography variant="h2">{c.value}</Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {c.label}
//               </Typography>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>

//       <Grid container spacing={2}>
//         <Grid item xs={12} md={7}>
//           <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2.5 }}>
//             <Typography variant="h6" sx={{ mb: 2 }}>
//               Recent Tasks
//             </Typography>
//             {!loading &&
//               tasks.slice(0, 5).map((t) => (
//                 <Box
//                   key={t._id}
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     py: 1.2,
//                     borderBottom: "1px solid",
//                     borderColor: "divider",
//                     "&:last-child": { borderBottom: 0 },
//                   }}
//                 >
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
//                     <PriorityFlag priority={t.priority} />
//                     <Typography variant="body2" fontWeight={600}>
//                       {t.title}
//                     </Typography>
//                   </Box>
//                   <StatusChip status={t.status} />
//                 </Box>
//               ))}
//           </Paper>
//         </Grid>

//         <Grid item xs={12} md={5}>
//           <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2.5, height: "100%" }}>
//             <Typography variant="h6" sx={{ mb: 2 }}>
//               Completion Rate
//             </Typography>
//             <Typography variant="h2" sx={{ mb: 1 }}>
//               {Math.round((done / total) * 100)}%
//             </Typography>
//             <LinearProgress
//               variant="determinate"
//               value={(done / total) * 100}
//               sx={{ height: 10, borderRadius: 5, mb: 1.5 }}
//             />
//             <Typography variant="body2" color="text.secondary">
//               {done} of {tasks.length} tasks completed
//             </Typography>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }


import { Box, Grid, Paper, Typography, Avatar, LinearProgress } from "@mui/material";
import ChecklistRtlRoundedIcon from "@mui/icons-material/ChecklistRtlRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import StatusChip from "../components/tasks/StatusChip.jsx";
import PriorityFlag from "../components/tasks/PriorityFlag.jsx";
import { useTasks } from "../context/TaskContext.jsx";

const statCards = (tasks) => {
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "completed" || t.status === "done").length;
  const inProgress = tasks.filter((t) => t.status === "inprogress" || t.status === "pending").length;
  const overdue = tasks.filter((t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "done").length;

  return [
    { label: "Total Tasks", value: total, icon: <ChecklistRtlRoundedIcon />, color: "#7B68EE" },
    { label: "Completed", value: done, icon: <CheckCircleRoundedIcon />, color: "#00C875" },
    { label: "In Progress", value: inProgress, icon: <PendingActionsRoundedIcon />, color: "#4A90E2" },
    { label: "Overdue", value: overdue, icon: <BusinessCenterRoundedIcon />, color: "#F45C5C" },
  ];
};

export default function Dashboard() {
  const { allTasks, loading } = useTasks();
  const cards = statCards(allTasks);
  const total = allTasks.length || 1;
  const done = allTasks.filter((t) => t.status === "completed" || t.status === "done").length;

  return (
    <Box>
      <Typography variant="h1" sx={{ mb: 0.5 }}>
        Welcome back 👋
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Today's Team overview.
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {cards.map((c) => (
          <Grid item xs={12} sm={6} md={3} key={c.label}>
            <Paper variant="outlined" sx={{ p: 2.2, borderRadius: 2.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
                <Avatar sx={{ bgcolor: `${c.color}1F`, color: c.color, width: 38, height: 38 }}>
                  {c.icon}
                </Avatar>
              </Box>
              <Typography variant="h2">{c.value}</Typography>
              <Typography variant="body2" color="text.secondary">
                {c.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2.5 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Recent Tasks
            </Typography>
            {!loading &&
              allTasks.slice(0, 5).map((t) => (
                <Box
                  key={t._id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    py: 1.2,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    "&:last-child": { borderBottom: 0 },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                    <PriorityFlag priority={t.priority || "normal"} />
                    <Typography variant="body2" fontWeight={600}>
                      {t.name || t.title}
                    </Typography>
                  </Box>
                  <StatusChip status={t.status} />
                </Box>
              ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2.5, height: "100%" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Completion Rate
            </Typography>
            <Typography variant="h2" sx={{ mb: 1 }}>
              {Math.round((done / total) * 100)}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(done / total) * 100}
              sx={{ height: 10, borderRadius: 5, mb: 1.5 }}
            />
            <Typography variant="body2" color="text.secondary">
              {done} of {allTasks.length} tasks completed
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}