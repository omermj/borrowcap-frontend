import { Outlet, useNavigate, Navigate, Route } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../auth/UserContext";

/** Protected Route Wrapper */

const ProtectedRoute = ({ allowedRoles, redirectPath = "/login" }) => {
  const { currentUser } = useContext(UserContext);

  // if currentUser doesnt exist or if currentUser is not authorized
  if (
    !currentUser ||
    !currentUser.roles.some((role) => allowedRoles.includes(role))
  )
    return <Navigate to={redirectPath} />;

  return <Outlet />;
};

export default ProtectedRoute;
