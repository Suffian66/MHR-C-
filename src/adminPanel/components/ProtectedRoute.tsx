// // src/components/ProtectedRoute.tsx
// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../features/authContext";

// const ADMIN_EMAIL = "test@email.com";

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const { user } = useAuth();

//   if (!user) return <Navigate to="/login" replace />;
//   if (user.email !== ADMIN_EMAIL) return <Navigate to="/" replace />;

//   return <>{children}</>;
// };

// export default ProtectedRoute;
