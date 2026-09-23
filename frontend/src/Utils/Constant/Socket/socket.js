import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';
// process.env.REACT_APP_SOCKET_URL || 

let socket = null;

export const connectSocket = (token) => {
  if (socket) return socket;
  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ['websocket']
  });
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
