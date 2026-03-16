import { google } from 'googleapis';
import { oauth2Client } from '../config/googleOAuth.js';
import { getIo } from '../socket/socketServer.js';
import { extractEmailData } from '../utils/emailParser.js';

// State to track processed messages and polling intervals
class GmailServiceState {
  constructor() {
    this.processedMessages = new Set();
    this.pollingInterval = null;
    this.isFetching = false;
  }
}

const state = new GmailServiceState();

export async function getLatestEmails() {
  try {
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    
    // Fetch latest 10 messages from INBOX
    const response = await gmail.users.messages.list({
      userId: 'me',
      labelIds: ['INBOX'],
      maxResults: 10,
    });

    const messages = response.data.messages || [];
    const extractedEmails = [];

    for (const message of messages) {
      const emailData = await extractEmailData(gmail, message.id);
      if (emailData) {
        state.processedMessages.add(message.id);
        extractedEmails.push(emailData);
      }
    }

    return extractedEmails;
  } catch (error) {
    console.error('Error fetching latest emails:', error.message);
    throw error;
  }
}

async function pollRecentEmails() {
  if (state.isFetching) return; // Prevent overlap
  state.isFetching = true;

  try {
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    
    // Check for recent ones
    const response = await gmail.users.messages.list({
      userId: 'me',
      labelIds: ['INBOX'],
      maxResults: 5,
    });

    const messages = response.data.messages || [];
    
    for (const message of messages) {
      // Process only if it has not been seen
      if (!state.processedMessages.has(message.id)) {
        
        const emailData = await extractEmailData(gmail, message.id);
        
        if (emailData) {
          // Log structured JSON as required for monitoring
          const logEntry = {
            subject: emailData.subject,
            from: emailData.from,
            body: emailData.body,
            timestamp: emailData.timestamp
          };
          
          console.log(JSON.stringify(logEntry, null, 2));

          // Emit real-time event
          getIo().emit('new-email', emailData);
          
          // Mark as processed
          state.processedMessages.add(message.id);
        }
      }
    }
  } catch (error) {
    console.error('Error during email polling:', error.message);
  } finally {
    state.isFetching = false;
  }
}

/**
 * Start background polling for new emails
 */
export function startWatch() {
  if (state.pollingInterval) {
    console.log('Polling is already running.');
    return { status: 'already_running' };
  }

  console.log('Starting email polling every 20 seconds...');
  
  // Set interval for 20 seconds
  state.pollingInterval = setInterval(pollRecentEmails, 20 * 1000);

  return { status: 'started' };
}

export function stopWatch() {
  if (state.pollingInterval) {
    clearInterval(state.pollingInterval);
    state.pollingInterval = null;
    console.log('Stopped email polling.');
    return { status: 'stopped' };
  }
  return { status: 'not_running' };
}
