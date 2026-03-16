import express from 'express';
import { getAuthUrl, getTokens, setCredentials } from '../config/googleOAuth.js';
import { getLatestEmails, startWatch, stopWatch } from '../services/gmailService.js';
import { predict } from '../services/predictService.js';
import { reasonAboutPrediction } from '../services/agentService.js';

const router = express.Router();

// Temporary in-memory storage for auth tokens (will be refactored to use secure session storage later)
let userTokens = null;

// Frontend URL for redirecting after OAuth (set in .env as FRONTEND_URL)
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

router.get('/auth/google', (req, res) => {
  const url = getAuthUrl();
  res.redirect(url);
});

router.get('/auth/google/callback', async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: 'Authorization code missing.' });
    }

    const tokens = await getTokens(code);
    userTokens = tokens; // Store securely in memory

    // Redirect to frontend with success indicator
    res.redirect(`${FRONTEND_URL}/?auth=success`);
  } catch (error) {
    console.error('Error during OAuth callback:', error.message);
    res.status(500).json({ error: 'Failed to complete OAuth flow.' });
  }
});

router.get('/auth/status', (req, res) => {
  res.json({ authenticated: Boolean(userTokens) });
});

router.post('/auth/logout', (req, res) => {
  userTokens = null;
  stopWatch();
  res.json({ loggedOut: true });
});

router.get('/gmail/latest', async (req, res) => {
  if (!userTokens) {
    return res.status(401).json({ error: 'Unauthorized. Please authenticate via /auth/google first.' });
  }

  try {
    // Ensure credentials are set
    setCredentials(userTokens);

    const emails = await getLatestEmails();
    res.json(emails);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch latest emails.', details: error.message });
  }
});
//start watch is for 
router.post('/gmail/start-watch', (req, res) => {
  if (!userTokens) {
    return res.status(401).json({ error: 'Unauthorized. Please authenticate via /auth/google first.' });
  }

  // Ensure credentials are set
  setCredentials(userTokens);

  const result = startWatch();
  res.json(result);
});

/**
 * Route: POST /gmail/stop-watch
 * Description: Stop monitoring new incoming emails
 */
router.post('/gmail/stop-watch', (req, res) => {
  const result = stopWatch();
  res.json(result);
});

/**
 * Route: POST /predict
 * Description: Get prediction from external API and get Groq reasoning
 * Request body: { emailBody: string } or plain text
 * Response: { prediction: {...}, reasoning: {...}, timestamp: string }
 */
router.post('/predict', async (req, res) => {
  try {
    // Get the email body from the request
    const emailBody = typeof req.body === 'string' ? req.body : req.body?.emailBody;

    if (!emailBody) {
      return res.status(400).json({
        error: 'Missing email body in request',
      });
    }

    // Step 1: Get prediction from external API
    console.log('Sending to prediction API:', { text: emailBody });
    const prediction = await predict(emailBody);
    console.log('Prediction result:', prediction);

    // Step 2: Get reasoning from Groq agent about the prediction
    const reasoning = await reasonAboutPrediction(emailBody, prediction);

    // Step 3: Return combined response
    res.json({
      prediction,
      reasoning,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in /predict:', error.message);
    res.status(500).json({
      error: 'Failed to process email',
      details: error.message,
    });
  }
});

export default router;
