import { Server } from 'socket.io';

let io;

export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected to Socket.io: ' + socket.id);

    socket.on('disconnect', () => {
      console.log('Client disconnected: ' + socket.id);
    });
  });

  return io;
}

export function getIo() {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
}
