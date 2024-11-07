// frontend/src/pages/LoginSignup.jsx

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const LoginSignup = () => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    const endpoint = isLogin ? "/login" : "/signup";
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_FRONTEND_API_BASE_URL}${endpoint}`,
        { email, password }
      );
      toast.success(response.data.message);
      if (response.data.token) {
        login(response.data.token);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error in authentication");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-700 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">
        {isLogin ? "Login" : "Sign Up"}
      </h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 p-3 rounded bg-gray-800 text-white placeholder-gray-400"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 p-3 rounded bg-gray-800 text-white placeholder-gray-400"
      />
      <button
        onClick={handleAuth}
        className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 rounded text-white font-semibold"
      >
        {isLogin ? "Login" : "Sign Up"}
      </button>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="w-full mt-4 py-3 bg-gray-600 hover:bg-gray-700 rounded text-white font-semibold"
      >
        Switch to {isLogin ? "Sign Up" : "Login"}
      </button>
    </div>
  );
};

export default LoginSignup;
