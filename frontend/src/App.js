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

// A wrapper component to conditionally render routes based on authentication
const ProtectedRoutes = () => {
  const { isLoggedIn } = useAuth();
  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? <Navigate to="/upload" /> : <Navigate to="/home" />
        }
      />
      <Route path="/home" element={<LoginSignup />} />
      <Route
        path="/upload"
        element={isLoggedIn ? <FileUpload /> : <Navigate to="/home" />}
      />
      <Route
        path="/test"
        element={isLoggedIn ? <TestModel /> : <Navigate to="/home" />}
      />
      <Route path="*" element={<Navigate to="/" />} />
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
            <ProtectedRoutes />
          </div>
          <Toaster position="bottom-right" reverseOrder={false} />
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
