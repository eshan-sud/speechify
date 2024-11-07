// backend/server/server.js

const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const audioRoutes = require("./routes/audio");
const modelRoutes = require("./routes/model");

const app = express();
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

app.use("/api", authRoutes);
app.use("/api", audioRoutes);
app.use("/api", modelRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
