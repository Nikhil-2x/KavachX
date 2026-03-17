import express from 'express';
import { predict } from '../services/predictService.js';
import { reasonAboutPrediction } from '../services/agentService.js';
const router = express.Router();

router.post('/url', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }
        
        // Get prediction
        const prediction = await predict(url);
        
        // Get reasoning
        let reasoning = null;
        try {
            reasoning = await reasonAboutPrediction(url, prediction);
        } catch (reasonError) {
            console.error('Error getting reasoning for URL:', reasonError.message);
        }

        res.json({
            prediction,
            reasoning,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching URL:', error);
        res.status(500).json({ error: 'Failed to fetch URL' });
    }
});

export default router;