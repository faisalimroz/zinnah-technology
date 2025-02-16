import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Private = ({ children }) => {
    const { user,loading } = useSelector((state) => state.auth);
    const location = useLocation(); // Preserve original URL for redirect

    if (!user&&!loading) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    return children;
};

export default Private;
