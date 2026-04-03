import express from "express";
import multer from "multer";
import { predictVideo } from "../services/predictService.js";

const router = express.Router();
const upload = multer(); // Store file in memory

router.post("/video", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No video file uploaded" });
    }

    // Pass the buffer and filename to the service
    const prediction = await predictVideo(
      req.file.buffer,
      req.file.originalname,
    );

    res.json({
      success: true,
      data: {
        prediction,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;