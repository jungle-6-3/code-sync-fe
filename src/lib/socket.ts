import { io, Socket } from "socket.io-client";

interface SocketErrorResponse {
  success: false;
  event: string;
  code: string;
  message: string;
}

const URL = import.meta.env.VITE_WS_URL || "http://localhost:4000";

export class SocketIoSocket {
  private static instance: SocketIoSocket;

  private constructor() { }

  static getInstance(): SocketIoSocket {
    if (!SocketIoSocket.instance) {
      SocketIoSocket.instance = new SocketIoSocket();
    }
    return SocketIoSocket.instance;
  }

  async initializeSocket({ roomUuid }: { roomUuid: string }) {
    return new Promise<Socket>((resolve) => {
      const socket = io(URL, {
        autoConnect: false,
        withCredentials: true,
        query: {
          roomUuid,
        },
      });

      socket
        .connect()
        .on("exception", (error: SocketErrorResponse) => {
          console.error(error);
        })
        .once("connect", () => {
          resolve(socket);
        });
    });
  }
}

export const socketIoSocket = SocketIoSocket.getInstance();