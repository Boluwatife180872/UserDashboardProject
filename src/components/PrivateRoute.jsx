import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config";
import Loader from "./Loader"; // adjust path if different

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Loader />;
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
