// frontend/src/components/Header.jsx

import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  return (
    <header className="bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">
          <span className="text-indigo-400">Speechify</span>
        </h1>
        <nav className="space-x-6">
          <Link to="/" className="hover:text-indigo-400">
            Home
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/upload" className="hover:text-indigo-400">
                Upload/Record Audio
              </Link>{" "}
              |
              <Link to="/test" className="hover:text-indigo-400">
                Test Model
              </Link>{" "}
              |
              <button onClick={logout} className="text-red-500">
                Logout
              </button>
            </>
          ) : (
            <span>Login to upload and test</span>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
