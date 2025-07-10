import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store";

export default function requireAuth<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  const ComponentWithAuth = (props: T) => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    if (!isLoggedIn) {
      return <Navigate to="/" replace />;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
}
