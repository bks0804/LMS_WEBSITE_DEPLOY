import { Navigate } from "react-router-dom";
const isAuthenticated = window.localStorage.getItem("token");
const user = localStorage.getItem("userRole");

export const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }
  return children;
};

export const AuthenticateUser = ({ children, isAuthenticated }) => {
  return isAuthenticated ? <Navigate to="/" /> : children;
};

export const AdminRoute = ({ children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  if (!["admin", "superadmin"].includes(user?.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
};
