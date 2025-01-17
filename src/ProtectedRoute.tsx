import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {

  const isTokenValid = (token: string | null): boolean => {
    if (!token) return false;
  
    try {
      const { exp } = JSON.parse(atob(token.split(".")[1]));
      return Date.now() < exp * 1000;
    } catch (e) {
      console.error("Invalid token:", e);
      return false;
    }
  };

  const token = localStorage.getItem("token");
  if (!token || !isTokenValid(token)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
