import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_WS_URL || 'http://localhost:4000';

export const socket = io(URL, {
  autoConnect: false
})