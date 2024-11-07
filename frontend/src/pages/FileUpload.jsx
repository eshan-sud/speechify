// frontend/src/pages/FileUpload.jsx

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const FileUpload = () => {
  const { isLoggedIn } = useAuth();
  const [file, setFile] = useState(null);

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("audio", file);
    try {
      const response = await axios.post("/api/upload-audio", formData);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Error uploading audio");
    }
  };

  if (!isLoggedIn) {
    return <div>Please login to upload audio.</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-gray-700 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Upload or Record Audio</h2>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-600"
      />
      <button
        onClick={handleFileUpload}
        className="w-full mt-4 py-3 bg-indigo-500 hover:bg-indigo-600 rounded text-white font-semibold"
      >
        Upload Audio
      </button>
    </div>
  );
};

export default FileUpload;
