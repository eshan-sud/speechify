import axios from "axios";

export const uploadAudio = (file) => {
  const formData = new FormData();
  formData.append("audio", file);
  return axios.post("/api/upload-audio", formData);
};
