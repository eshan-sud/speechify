// frontend/src/pages/TestModel.jsx

import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const TestModel = () => {
  const { isLoggedIn } = useAuth();
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const handleTest = async () => {
    try {
      const response = await axios.post("/api/test-model", { text });
      setAudioUrl(response.data.audioUrl);
    } catch (error) {
      console.error(error);
      alert("Error testing the model");
    }
  };

  if (!isLoggedIn) {
    return <div>Please login to test the model.</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-gray-700 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Test the Trained Model</h2>
      <input
        type="text"
        placeholder="Enter text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full mb-4 p-3 rounded bg-gray-800 text-white placeholder-gray-400"
      />
      <button
        onClick={handleTest}
        className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 rounded text-white font-semibold"
      >
        Test Model
      </button>
      {audioUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Generated Audio:</h3>
          <audio controls src={audioUrl} className="w-full"></audio>
        </div>
      )}
    </div>
  );
};

export default TestModel;
