import { addPeerCallListeners, addStreamConnectionAtPeer, addUserDisconnectedListener, initializePeerConnection, PeerConnection } from "@/lib/peer";
import { socketIoSocket } from "@/lib/socket";
import { initializeYjsSocket } from "@/lib/yjs";
import { Socket } from "socket.io-client";
import { WebsocketProvider } from "y-websocket";
import * as Y from 'yjs';

export class SocketManager {
  private static instance: SocketManager;

  public peerConnection!: PeerConnection
  public yjsSocket!: { ydoc: Y.Doc, provider: WebsocketProvider };
  public socketIOSocket!: Socket;
  initialized: Promise<void>;

  private constructor({ roomUuid }: { roomUuid: string }) {
    this.initialized = this.connectAllSockets({ roomUuid });
  }

  async ready(): Promise<void> {
    await this.initialized;
  }

  static getInstance(roomUuid?: string): SocketManager {
    if (!SocketManager.instance) {
      if (!roomUuid) {
        throw new Error("roomUuid is required to initialize SocketManager");
      }
      SocketManager.instance = new SocketManager({ roomUuid });
    }
    return SocketManager.instance;
  }

  private async connectAllSockets({ roomUuid }: { roomUuid: string }) {
    const [peerConnection, yjsSocket, ioSocket] = await Promise.all([
      await initializePeerConnection(),
      await initializeYjsSocket({ roomUuid }),
      await socketIoSocket.initializeSocket({ roomUuid })
    ])
    this.peerConnection = peerConnection;
    this.yjsSocket = yjsSocket;
    this.socketIOSocket = ioSocket;

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
  }
}
