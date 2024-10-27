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

interface SocketJoinRequestBy {
  message: string;
  data: {
    email: string;
    peerId: string;
  };
}

export const usePeer = () => {
  const createPeer = peerStore((state) => state.createPeer);
  const peers = peerStore((state) => state.peers);
  const peer = peerStore((state) => state.peer);
  const mediaStream = userMediaStore((state) => state.mediaStream);
  const socket = socketStore((state) => state.socket);
  const peerId = peerStore((state) => state.peerId);
  const addOpponentMediaStream = userMediaStore(
    (state) => state.addOpponentMediaStream,
  );
  const removeOpponentMediaStream = userMediaStore(
    (state) => state.removeOpponentMediaStream,
  );

  const onCreatePeer = () => {
    if (!peer) {
      createPeer();
    }
  };

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
        if (peers[peerId]) peers[peerId].close();
      },
    );

    return () => {
      socket.off("new-peer-id");
    };
  }, [socket, peers, peer]);

  useEffect(() => {
    if (!socket || !peer) return;
    socket.emit("share-peer-id", { peerId });
    socket.on(
      "new-peer-id",
      ({ data: { peerId: remotePeerId } }: SocketJoinRequestBy) => {
        if (peerId == remotePeerId || !mediaStream) return;
        const call = peer?.call(remotePeerId, mediaStream);
        if (!call) return;

        call.on("stream", (remoteStream) => {
          addOpponentMediaStream(remoteStream);
        });

        call.on("close", () => {
          removeOpponentMediaStream(call.remoteStream);
        });

        peers[remotePeerId] = call;
      },
    );

    return () => {
      socket.off("new-peer-id");
    };
  }, [peer]);

  return { onCreatePeer };
};
