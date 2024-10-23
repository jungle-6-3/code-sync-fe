import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_WS_URL || 'http://localhost:4000';

const socket = io(URL, {
  autoConnect: false,
  withCredentials: true,
})

interface SocketJoinRequestBy {
  message: string;
  data: {
    participant: {
      name: string;
      email: string;
    }
  }
}

socket.on('join-request-by', ({ data, message }: SocketJoinRequestBy) => {
  // TODO: toast로 사람이 들어왔다는 메시지를 보여주어야 함.
})

interface SocketInviteResponse {
  message: string;
}

socket.on('invite-rejected', ({ message }: SocketInviteResponse) => {
  // TODO: reject 메시지를 보여주어야 함. (component에서)
});

socket.on('invite-accepted', ({ message }: SocketInviteResponse) => {
  // TODO: ready화면에서 conversationo 화면으로 이동해야함.
});

interface SocketUserDisconnected {
  message: string;
  data: {
    name: string;
    email: string;
  }
}

socket.on('user-disconnected', ({ data, message }: SocketUserDisconnected) => {
  // TODO: toast로 사람이 나갔다는 메시지를 보여주어야 함.
});

export const socketJoinRequest = ({ uuid }: { uuid: string }) => {
  socket.emit('join-request', { uuid });
}

export const socketInviteUser = ({ email }: { email: string }) => {
  socket.emit('invite-user', { email });
}

export default socket;