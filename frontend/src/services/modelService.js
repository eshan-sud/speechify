import axios from "axios";

export const testModel = (text) => axios.post("/api/test-model", { text });
