import express from 'express';
import multer from 'multer';
import { predictImage } from '../services/imagePredictService.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/predict-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const { buffer, originalname, mimetype } = req.file;
    const result = await predictImage(buffer, originalname, mimetype);

    res.json(result);
  } catch (error) {
    console.error('Error predicting image:', error.message);
    res.status(500).json({ error: 'Failed to predict image' });
  }
});

export default router;
