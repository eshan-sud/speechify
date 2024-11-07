import axios from "axios";

export const login = (email, password) =>
  axios.post("/api/login", { email, password });
export const signup = (email, password) =>
  axios.post("/api/signup", { email, password });
