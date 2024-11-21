// frontend/src/pages/FileUpload.jsx

import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { Mic, Square, Upload } from "lucide-react";

const FileUpload = () => {
  const { isLoggedIn } = useAuth();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        const audioFile = new File([blob], "recording.wav", {
          type: "audio/wav",
        });
        setFile(audioFile);
        setRecordedChunks(chunks);
        setPreviewUrl(URL.createObjectURL(blob)); // Set the preview URL
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      toast.error("Error accessing microphone");
      console.error("Error:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);
      clearInterval(timerRef.current);
      setRecordingTime(0);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast.error("Please select or record an audio file first");
      return;
    }

    const formData = new FormData();
    formData.append("audio", file);

    try {
      const response = await axios.post("/api/upload-audio", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          toast.loading(`Upload Progress: ${percentCompleted}%`, {
            id: "uploadProgress",
          });
        },
      });

      toast.dismiss("uploadProgress");
      toast.success(response.data.message);
      setFile(null);
      setPreviewUrl(null);
    } catch (error) {
      toast.dismiss("uploadProgress");
      toast.error(error.response?.data?.message || "Error uploading audio");
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-md mx-auto bg-gray-700 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Upload or Record Audio</h2>
      <div className="mb-6">
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="block w-full text-gray-400 file:mr-4 file:py-2 file:px-4 
                     file:rounded-full file:border-0 file:text-sm file:font-semibold 
                     file:bg-indigo-500 file:text-white hover:file:bg-indigo-600"
        />
      </div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-medium">Or Record Audio</span>
          {isRecording && (
            <span className="text-red-400 animate-pulse">
              Recording: {formatTime(recordingTime)}
            </span>
          )}
        </div>

        <div className="flex space-x-4">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="flex-1 py-3 bg-red-500 hover:bg-red-600 rounded 
                       text-white font-semibold flex items-center justify-center"
            >
              <Mic className="mr-2" size={20} />
              Start Recording
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex-1 py-3 bg-gray-500 hover:bg-gray-600 rounded 
                       text-white font-semibold flex items-center justify-center"
            >
              <Square className="mr-2" size={20} />
              Stop Recording
            </button>
          )}
        </div>
      </div>

      {/* Upload Button */}
      {file && (
        <div className="mt-6">
          <div className="text-sm text-gray-300 mb-2">
            Selected file: {file.name}
          </div>
          <button
            onClick={handleFileUpload}
            className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 rounded 
                     text-white font-semibold flex items-center justify-center"
          >
            <Upload className="mr-2" size={20} />
            Upload Audio
          </button>
        </div>
      )}

      {/* Preview Section */}
      {previewUrl && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Preview Audio</h3>
          <audio controls src={previewUrl} className="w-full" />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
