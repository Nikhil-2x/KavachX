import express from 'express';
import axios from 'axios';

const router = express.Router();

// Route to check email breach
router.get('/breach-check', async (req, res) => {
    const { email } = req.query;
    // console.log(email)
    if (!email) {
        return res.status(400).json({ error: 'Email parameter is required' });
    }

    try {
        const response = await axios.get(`https://leakcheck.io/api/public?check=${encodeURIComponent(email)}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error checking email breach:', error);
        res.status(500).json({ error: 'Failed to check email breach' });
    }
});

export default router;