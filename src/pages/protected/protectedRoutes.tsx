import { Navigate, Outlet } from "react-router-dom";
import type { ProtectedRoutesTypes } from "../../types";

const ProtectedRoutes = ({
  token,
  redirectPath = "/",
  children,
}: ProtectedRoutesTypes) => {
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoutes;
