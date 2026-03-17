import express from 'express';
import { predict } from '../services/predictService.js';
const router = express.Router();

router.post('/url', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }
        const result = await predict(url);
        res.json(result);
    } catch (error) {
        console.error('Error fetching URL:', error);
        res.status(500).json({ error: 'Failed to fetch URL' });
    }
});

export default router;