import { io, Socket } from "socket.io-client";
import { create } from "zustand";

const URL = import.meta.env.VITE_WS_URL || "http://localhost:4000";


interface SocketErrorResponse {
  success: false;
  event: string;
  code: string;
  message: string;
}


interface SocketStore {
  socket?: Socket;
  roomUuid: string;
  isCreator: boolean;
  setIsCreator: (isCreator: boolean) => void;
  setRoomUuid: (uuid: string) => void;
  setSocket: () => void;
}

export const socketStore = create<SocketStore>()((set) => ({
  socket: undefined,
  roomUuid: "",
  isCreator: false,
  setIsCreator: (isCreator) => set({ isCreator }),
  setRoomUuid: (uuid) => set({ roomUuid: uuid }),
  setSocket: () => {
    set((state) => {
      // for singleton pattern
      if (state.socket) return { socket: state.socket };
      const roomUuid = state.roomUuid;
      if (!roomUuid) throw new Error("잘못된 접근입니다.");
      const socket = io(URL, {
        autoConnect: false,
        withCredentials: true,
        query: {
          roomUuid,
        },
      });
      socket.on("exception", (error: SocketErrorResponse) => {
        console.error(error);
      });
      return { socket };
    })
  },
}));


// this.socket.on("invite-rejected", ({ message }: SocketInviteResponse) => {
//   // TODO: reject 메시지를 보여주어야 함. (component에서)
// });

// this.socket.on("invite-accepted", ({ message }: SocketInviteResponse) => {
//   // TODO: ready화면에서 conversation 화면으로 이동해야함.
// });