import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
// import { useAuthStore } from '../store/useAuthStore';

export const ProtectedRoute = ({ children, adminOnly = false }) => {
  // const { isAuthenticated, user } = useAuthStore();
  const {isAuthenticated}=useSelector(state=>state.auth)
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (adminOnly && !user?.isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};