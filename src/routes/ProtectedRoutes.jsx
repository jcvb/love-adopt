import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoutes = () => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  if (!authenticated) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoutes;
