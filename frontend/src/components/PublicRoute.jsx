// src/components/PublicRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>; // Handle loading state

  // If the user is logged in, redirect to home page
  return user ? <Navigate to="/" /> : children;
};

export default PublicRoute;
