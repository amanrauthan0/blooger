import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function ProtectedRoutes({children}){

    const{user,loading}=useAuth();

    if(loading){
        <h2>Loading...</h2>
    }
    if(!user&& !loading){
        return <Navigate to="/login" replace />
    }
    return children;
}