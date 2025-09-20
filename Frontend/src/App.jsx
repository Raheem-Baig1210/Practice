import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInCard from "./components/sign-in-card-2";
import HomePage from "./components/Home";
import AdminDashboard from "./components/Admin/admin-dashboard";  
import Private from "./components/private"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/admin-dashboard" element={<Private><AdminDashboard/></Private>}/>
        <Route path="/signin" element={<SignInCard />} />
        <Route path="/signup" element={<div>Signup Page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
