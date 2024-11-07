// backend/audio.js

const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload-audio", upload.single("audio"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({ message: "File uploaded successfully", filePath: req.file.path });
});

module.exports = router;
