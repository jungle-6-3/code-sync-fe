import { userMediaStore } from "@/stores/userMedia.store";
import Peer, { MediaConnection } from "peerjs";
import { Socket } from "socket.io-client";

export interface PeerConnection {
  peer: Peer;
  id: string;
  peers: Record<string, MediaConnection>;
}

export const initializePeerConnection = async () => {
  return new Promise<PeerConnection>((resolve) => {
    const peer = new Peer();
    peer.once("open", (id) => {
      resolve({ peer, id, peers: {} });
    });
  });
}

export const addPeerCallListeners = ({ peer, peers }: {
  peer: Peer, peers: Record<string, MediaConnection>
}) => {
  const addOpponentMediaStream = userMediaStore.getState().addOpponentMediaStream;
  const removeOpponentMediaStream = userMediaStore.getState().removeOpponentMediaStream;
  const mediaStream = userMediaStore.getState().mediaStream;

  peer.on("call", (call) => {
    if (!mediaStream) return;
    call.answer(mediaStream);

    call
      .on("stream", (remoteStream) => {
        addOpponentMediaStream(remoteStream);
      })
      .on("close", () => {
        removeOpponentMediaStream(call.remoteStream);
      })
    peers[call.peer] = call;
  });
}
interface SocketUserDisconnected {
  message: string;
  data: {
    name: string;
    email: string;
    peerId: string;
  };
}

export const addUserDisconnectedListener = ({ peers, socket }: {
  socket: Socket, peers: Record<string, MediaConnection>
}) => {
  socket.on(
    "user-disconnected",
    ({ data: { peerId } }: SocketUserDisconnected) => {
      const call = peers[peerId];
      if (!call) return;
      call.close();
      delete peers[peerId];
      peers = { ...peers };
    },
  );
}

interface SocketJoinRequestBy {
  message: string;
  data: {
    email: string;
    peerId: string;
  };
}

export const addStreamConnectionAtPeer = ({ peer, peerId, peers, socket }: {
  peer: Peer, peerId: string, socket: Socket, peers: Record<string, MediaConnection>
}) => {
  const addOpponentMediaStream = userMediaStore.getState().addOpponentMediaStream;
  const removeOpponentMediaStream = userMediaStore.getState().removeOpponentMediaStream;
  const mediaStream = userMediaStore.getState().mediaStream;

  socket.on(
    "new-peer-id",
    ({ data: { peerId: remotePeerId } }: SocketJoinRequestBy) => {
      if (peerId == remotePeerId || !mediaStream) return;
      const call = peer?.call(remotePeerId, mediaStream);
      if (!call) return;

      call
        .on("stream", (remoteStream) => {
          addOpponentMediaStream(remoteStream);
        })
        .on("close", () => {
          removeOpponentMediaStream(call.remoteStream);
        })

      peers[remotePeerId] = call;
    },
  );
}
