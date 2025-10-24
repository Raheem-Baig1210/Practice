import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import SignInCard from "./components/sign-in-card-2";
import HomePage from "./components/Home";
import AdminDashboard from "./components/Admin/admin-dashboard";
import Private from "./components/private";
import Login from "./pages/Login";

// School Admin Components
import SchoolDashboard from "./components/School/school-dashboard";
import Overview from "./components/School/Overview";
import Students from "./components/School/Students";
import Teachers from "./components/School/Teachers";
import Classes from "./components/School/Classes";
import Attendance from "./components/School/Attendance";
import Exams from "./components/School/Exams";
import Fees from "./components/School/Fees";
import Settings from "./components/School/Settings";
// import Login from "./pages/Login";

function AppContent() {
  // const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signin" element={<SignInCard />} />
      <Route path="/signup" element={<div>Signup Page</div>} />

      {/* Admin Dashboard (existing) */}
      <Route path="/admin-dashboard" element={
        <Private>
          <AdminDashboard/>
        </Private>
      }/>

      {/* School Admin Dashboard */}
      <Route path="/school" element={
        <Private>
          <SchoolDashboard />
        </Private>
      }>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<Overview />} />
        <Route path="students" element={<Students />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="classes" element={<Classes />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="exams" element={<Exams />} />
        <Route path="fees" element={<Fees />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
    
        <AppContent />
      
    </BrowserRouter>
  );
}

export default App;

























































// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import SignInCard from "./components/sign-in-card-2";
// import HomePage from "./components/Home";
// import AdminDashboard from "./components/Admin/admin-dashboard";  
// import Private from "./components/private"


// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<HomePage />} />

//         <Route path="/admin-dashboard" element={<Private><AdminDashboard/></Private>}/>
//         <Route path="/signin" element={<SignInCard />} />
//         <Route path="/signup" element={<div>Signup Page</div>} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
