import { JoinRequestByToast, UserDisconnected } from "@/components/Toast";
import { io } from "socket.io-client";

const URL = import.meta.env.VITE_WS_URL || "http://localhost:4000";

const socket = io(URL, {
  autoConnect: false,
  withCredentials: true,
});

export interface SocketJoinRequestBy {
  message: string;
  data: {
    participant: {
      name: string;
      email: string;
    };
  };
}

socket.on("join-request-by", ({ data, message }: SocketJoinRequestBy) => {
  JoinRequestByToast({ data, message });
});

interface SocketInviteResponse {
  message: string;
}

socket.on("invite-rejected", ({ message }: SocketInviteResponse) => {
  // TODO: reject 메시지를 보여주어야 함. (component에서)
});

socket.on("invite-accepted", ({ message }: SocketInviteResponse) => {
  // TODO: ready화면에서 conversation 화면으로 이동해야함.
});

export interface SocketUserDisconnected {
  message: string;
  data: {
    name: string;
    email: string;
  };
}

socket.on("user-disconnected", ({ message }: SocketUserDisconnected) => {
  UserDisconnected({ message });
});

export const socketJoinRequest = ({ uuid }: { uuid: string }) => {
  socket.emit("join-request", { uuid });
};

export const socketInviteUser = ({ email }: { email: string }) => {
  socket.emit("invite-user", { email });
};

interface SocketErrorResponse {
  success: false;
  event: string;
  code: string;
  message: string;
}

socket.on("exception", ({ code, event, message }: SocketErrorResponse) => {
  console.error({ code, event, message });
});

export default socket;
