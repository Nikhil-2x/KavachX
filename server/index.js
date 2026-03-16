import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import http from 'http';
import * as url from 'url';
import { initSocket } from './socket/socketServer.js';
import gmailRoutes from './routes/gmailRoutes.js';


const app = express();
const server = http.createServer(app);

// Initialize Socket.io
initSocket(server);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', gmailRoutes);

// Environment variables
const PORT = process.env.PORT || 3000;

// Export app and server for pluggability into existing systems
export { app, server };

// Start Server conditionally if this is the main module
const isMainModule = url.fileURLToPath(import.meta.url) === process.argv[1];

if (isMainModule) {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`OAuth Redirect URI should be: http://localhost:${PORT}/auth/google/callback`);
  });
}
