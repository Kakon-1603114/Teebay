import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Authorization = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    // Redirect to login if no user is logged in
    return (
      <Navigate
        to={"/login"}
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
};

export default Authorization;
