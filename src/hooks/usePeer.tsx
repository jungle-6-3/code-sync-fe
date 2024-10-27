import { peerStore } from "@/stores/peer.store";
import { socketStore } from "@/stores/socket.store";
import { userMediaStore } from "@/stores/userMedia.store";
import { useEffect } from "react";

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
  const socket = socketStore((state) => state.socket);

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
