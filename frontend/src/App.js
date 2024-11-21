// frontend/src/App.js

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider, useAuth } from "./context/AuthContext";

import Header from "./components/Header";
import LoginSignup from "./pages/LoginSignup";
import FileUpload from "./pages/FileUpload";
import TestModel from "./pages/TestModel";

// Protected Route wrapper component
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return children;
};

// Public Route wrapper component
const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/upload" />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/home"
        element={
          <PublicRoute>
            <LoginSignup />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <FileUpload />
          </ProtectedRoute>
        }
      />
      <Route
        path="/test"
        element={
          <ProtectedRoute>
            <TestModel />
          </ProtectedRoute>
        }
      />

      {/* Default Routes */}
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <div className="bg-gray-800 min-h-screen text-white">
        <Router>
          <Header />
          <div className="container mx-auto p-8">
            <AppRoutes />
          </div>
          <Toaster position="bottom-right" reverseOrder={false} />
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
