// import { Children } from "react";
import { Navigate } from "react-router-dom";

const Private=({children})=>{
    const token =localStorage.getItem("token");
    if (!token){
        return <Navigate to="/signin"/>
    }

    return children;
}

export default Private