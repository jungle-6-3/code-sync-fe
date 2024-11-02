import { useEffect } from "react";
import { peerStore } from "@/stores/peer.store";
import { userMediaStore } from "@/stores/userMedia.store";
import { socketManager } from "@/lib/socketManager";

interface SocketUserDisconnected {
  message: string;
  data: {
    name: string;
    email: string;
    peerId: string;
  };
}

export const usePeer = () => {
  const peers = peerStore((state) => state.peers);
  const setPeers = peerStore((state) => state.setPeers);
  const peer = peerStore((state) => state.peer);
  const mediaStream = userMediaStore((state) => state.mediaStream);
  const socket = socketManager.socketIOSocket;

  useEffect(() => {
    if (!peer) return;
    peer.on("call", (call) => {
      if (!mediaStream) return;
      call.answer(mediaStream);
    });

    return () => {
      peer.off("call");
    };
  }, [peer, mediaStream]);

  useEffect(() => {
    if (!socket || !peer) return;

    socket.on(
      "user-disconnected",
      ({ data: { peerId } }: SocketUserDisconnected) => {
        const call = peers[peerId];
        if (!call) return;
        call.close();
        delete peers[peerId];
        setPeers(peers);
      },
    );

    return () => {
      socket.off("new-peer-id");
    };
  }, [socket, peers, peer, setPeers]);
};
