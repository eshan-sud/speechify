// frontend/src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import LoginSignup from "./pages/LoginSignup";
import FileUpload from "./pages/FileUpload";
import TestModel from "./pages/TestModel";

const App = () => {
  return (
    <AuthProvider>
      <div className="bg-gray-800 min-h-screen text-white">
        <Router>
          <Header />
          <div className="container mx-auto p-8">
            <Routes>
              <Route path="/" element={<LoginSignup />} />
              <Route path="/upload" element={<FileUpload />} />
              <Route path="/test" element={<TestModel />} />
            </Routes>
          </div>
          <Toaster position="bottom-right" reverseOrder={false} />
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
