import { addPeerCallListeners, addStreamConnectionAtPeer, addUserDisconnectedListener, initializePeerConnection, PeerConnection } from "@/lib/peer";
import { socketIoSocket } from "@/lib/socket";
import { initializeYjsSocket } from "@/lib/yjs";
import { Socket } from "socket.io-client";
import { WebsocketProvider } from "y-websocket";
import * as Y from 'yjs';

class SocketManager {
  private static instance: SocketManager;

  public peerConnection: PeerConnection | null = null;
  public yjsSocket: { ydoc: Y.Doc, provider: WebsocketProvider } | null = null;
  public socketIOSocket: Socket | null = null;

  private constructor() { }

  static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  async connectAllSockets({ roomUuid }: { roomUuid: string }) {
    this.peerConnection = await initializePeerConnection();
    this.yjsSocket = await initializeYjsSocket({ roomUuid });
    this.socketIOSocket = await socketIoSocket.initializeSocket({ roomUuid });
    addStreamConnectionAtPeer({
      peer: this.peerConnection.peer,
      peerId: this.peerConnection.id,
      socket: this.socketIOSocket,
      peers: this.peerConnection.peers
    });
    addPeerCallListeners({
      peer: this.peerConnection.peer,
      peers: this.peerConnection.peers
    });
    addUserDisconnectedListener({
      socket: this.socketIOSocket,
      peers: this.peerConnection.peers
    });
  }

  disconnectAllSockets() {
    this.peerConnection?.peer.disconnect();
    this.peerConnection?.peer.destroy();
    this.yjsSocket = null;
    this.socketIOSocket = null;
  }
}

export const socketManager = SocketManager.getInstance();