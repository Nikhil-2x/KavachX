import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Configure the Google OAuth2 client using credentials from .env
 */
export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Define the scopes for readonly Gmail access
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

/**
 * Generate an authentication URL for the user to visit
 * @returns {string} The URL to authenticate the user
 */
export function getAuthUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline', // Requests a refresh token
    scope: SCOPES,
    prompt: 'consent' // Forces consent screen to ensure refresh token is returned
  });
}

/**
 * Exchange the authorization code for tokens
 * @param {string} code - The authorization code returned from Google
 * @returns {Object} Access and refresh tokens
 */
export async function getTokens(code) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
}

/**
 * Set the credentials directly (e.g., from session or database)
 * @param {Object} tokens - Access and refresh tokens
 */
export function setCredentials(tokens) {
  oauth2Client.setCredentials(tokens);
}
