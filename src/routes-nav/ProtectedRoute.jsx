import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

/** Protected Route Wrapper */

const ProtectedRoute = ({ allowedRoles, redirectPath = "/login" }) => {
  const currentUser = useSelector((state) => state.userState.user);

  // if currentUser doesnt exist or if currentUser is not authorized
  if (
    !currentUser ||
    !currentUser.roles.some((role) => allowedRoles.includes(role))
  )
    return <Navigate to={redirectPath} />;

  return <Outlet />;
};

export default ProtectedRoute;
