import { JoinRequestByToast, UserDisconnected } from "@/components/Toast";
import { io, Socket } from "socket.io-client";

const URL = import.meta.env.VITE_WS_URL || "http://localhost:4000";

interface SocketErrorResponse {
  success: false;
  event: string;
  code: string;
  message: string;
}


export interface SocketJoinRequestBy {
  message: string;
  data: {
    participant: {
      name: string;
      email: string;
    };
  };
}


interface SocketInviteResponse {
  message: string;
}


export interface SocketUserDisconnected {
  message: string;
  data: {
    name: string;
    email: string;
  };
}

export class ConversationSocket {
  private static instance: ConversationSocket;
  private static roomId: string;
  private socket: Socket;

  private constructor() {
    this.socket = io(URL, {
      autoConnect: false,
      withCredentials: true,
    });

    this.socket.on("join-request-by", ({ data, message }: SocketJoinRequestBy) => {
      JoinRequestByToast({ data, message });
    });

    this.socket.on("invite-rejected", ({ message }: SocketInviteResponse) => {
      // TODO: reject 메시지를 보여주어야 함. (component에서)
    });

    this.socket.on("invite-accepted", ({ message }: SocketInviteResponse) => {
      // TODO: ready화면에서 conversation 화면으로 이동해야함.
    });

    this.socket.on("user-disconnected", ({ message }: SocketUserDisconnected) => {
      UserDisconnected({ message });
    });

    this.socket.on("exception", ({ code, event, message }: SocketErrorResponse) => {
      console.error({ code, event, message });
    });

  }

  socketJoinRequest({ uuid }: { uuid: string }) {
    this.socket.emit("join-request", { uuid });
  };

  socketInviteUser({ email }: { email: string }) {
    this.socket.emit("invite-user", { email });
  };

  disconnect() {
    this.socket.disconnect();
  }

  connect() {
    this.socket.connect();
  }

  static getInstance(roomId = "") {
    if (roomId) {
      this.roomId = roomId;
    }
    if (!this.roomId) {
      throw new Error("Room ID is not set");
    }
    if (!ConversationSocket.instance) {
      ConversationSocket.instance = new ConversationSocket();
    }
    return ConversationSocket.instance;
  }
}

