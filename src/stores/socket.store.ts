import { create } from "zustand";
import { io, Socket } from "socket.io-client";

const URL = import.meta.env.VITE_WS_URL || "http://localhost:4000";

interface SocketErrorResponse {
  success: false;
  event: string;
  code: string;
  message: string;
}

interface SocketStore {
  socket?: Socket;
  isCreator: boolean;
  setIsCreator: (isCreator: boolean) => void;
  setSocket: (roomUuid: string) => Promise<Socket>;
}

export const socketStore = create<SocketStore>()((set, get) => ({
  socket: undefined,
  isCreator: false,
  setIsCreator: (isCreator) => set({ isCreator }),
  setSocket: (roomUuid?: string) => {
    return new Promise((resolve) => {
      // for singleton pattern
      let socket = get().socket;
      if (socket) return resolve(socket);
      if (!roomUuid) throw new Error("잘못된 접근입니다.");
      socket = io(URL, {
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
          set({ socket });
          resolve(socket);
        });
    });
  }
}));
