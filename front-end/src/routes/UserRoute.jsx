
import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../contexts/useAuth";
export default function  UserRoute({children}){
    const {isAuthentificated,userRole}=useAuth;

    if(!isAuthentificated){
        return <Navigate to='/login'/>
    }

    if(userRole !== 'user'){
        return <Navigate to='/login'/>
    }


    return children
}