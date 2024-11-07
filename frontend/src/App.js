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

const App = () => {
  const { isLoggedIn } = useAuth();

  return (
    <AuthProvider>
      <div className="bg-gray-800 min-h-screen text-white">
        <Router>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? <Navigate to="/upload" /> : <Navigate to="/home" />
              }
            />
            <Route path="/home" element={<LoginSignup />} />
            <Route path="/upload" element={<FileUpload />} />
            <Route path="/test" element={<TestModel />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
          <Toaster position="bottom-right" reverseOrder={false} />
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
