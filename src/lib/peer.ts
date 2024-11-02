import { peerStore } from "@/stores/peer.store";
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

interface SocketJoinRequestBy {
  message: string;
  data: {
    email: string;
    peerId: string;
  };
}

export const addStreamConnectionAtPeer = (peer: Peer, peerId: string, socket: Socket) => {
  const addOpponentMediaStream = userMediaStore.getState().addOpponentMediaStream;
  const removeOpponentMediaStream = userMediaStore.getState().removeOpponentMediaStream;
  const peers = peerStore.getState().peers;
  const setPeers = peerStore.getState().setPeers;
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

      setPeers({ ...peers, [remotePeerId]: call });
    },
  );
}
