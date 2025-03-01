// To ensure that users are redirected to the login page if they are not authenticated 
// (i.e., they don’t have a valid token)

// This component will check for the authentication token before rendering the requested page. 
// If the token is missing or invalid, it will redirect the user to the login page.

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {

    const token = localStorage.getItem("token");

    // If there's no token, redirect to login
    // Ensure the token is valid (not empty, null, or undefined)
    if (!token || token === "null" || token === "undefined") {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />; // Render the protected content

};

export default ProtectedRoute;