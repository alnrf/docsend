import React from "react";
import { Navigate } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../configs/firebase";

const ProtectedRoute = ({ children }: any) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login/admin" />;
  }

  return children;
};

export default ProtectedRoute;
