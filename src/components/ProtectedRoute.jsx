import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (adminOnly && !user?.isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};