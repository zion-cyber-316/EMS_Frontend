
import React from "react";
import { useAuth } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

const RoleBaseRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role?.trim().toLowerCase();

  const allowedRoles = requiredRole.map((role) =>
    role.trim().toLowerCase()
  );

  if (!allowedRoles.includes(userRole)) {
    const dashboard =
      userRole === "admin"
        ? "/admin-dashbord"
        : "/employee-dashbord";

    return <Navigate to={dashboard} replace />;
  }

  return children;
};

export default RoleBaseRoute;





































// import React from 'react'
// import { useAuth } from '../Context/AuthContext'
// import { Navigate } from 'react-router-dom';

// const RoleBaseRoute = ({ children, requiredRole }) => {
  
//   const { user, loading } = useAuth();

//   // Loading state (auth verification running)
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // User not logged in
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // Role mismatch
//   if (!requiredRole.includes(user.role)) {
//     return <Navigate to="/unauthrized" replace />;
//   }

//   // Allowed content
//   return children;
// };

// export default RoleBaseRoute;
