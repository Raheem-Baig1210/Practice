// import { Children } from "react";
import { Navigate } from "react-router-dom";
import SchoolDashboard from "./School/school-dashboard";
import AdminDashboard from "./Admin/admin-dashboard";

const Private=()=>{
    const token =localStorage.getItem("token");
    const authToken =localStorage.getItem("authToken");
    if (token ){
        return <AdminDashboard/>
        
    } else if( authToken){
        return <SchoolDashboard/>
    }
    return <Navigate to="/signin"/>;
}

export default Private