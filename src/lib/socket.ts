import { extractGitHubPrDetails } from "@/lib/github";
import { SocketManager } from "@/lib/socketManager";
import { fileSysyemStore, prMetaDataStore } from "@/stores/github.store";
import { userMediaStore } from "@/stores/userMedia.store";
import { io, Socket } from "socket.io-client";

interface SocketErrorResponse {
  success: false;
  event: string;
  code: string;
  message: string;
}

const URL = import.meta.env.VITE_WS_URL || "http://localhost:4000";

export class SocketIoSocket {
  private static instance: SocketIoSocket;

  private constructor() {}

  static getInstance(): SocketIoSocket {
    if (!SocketIoSocket.instance) {
      SocketIoSocket.instance = new SocketIoSocket();
    }
    return SocketIoSocket.instance;
  }

  async initializeSocket({ roomUuid }: { roomUuid: string }) {
    return new Promise<Socket>((resolve) => {
      const socket = io(URL, {
        autoConnect: false,
        withCredentials: true,
        query: {
          roomUuid,
        },
      });

      socket
        .connect()
        .on("exception", (error: SocketErrorResponse) => {
          console.error(error);
        })
        .once("connect", () => {
          resolve(socket);
        });
    });
  }
}

export const socketIoSocket = SocketIoSocket.getInstance();

interface InviteAcceptedRespone {
  prUrl: string;
  role: "creator" | "participant";
}
interface AddInviteAcceptedListenerProps {
  socket: Socket;
}

export const addInviteAcceptedListener = async ({
  socket,
}: AddInviteAcceptedListenerProps) => {
  const setPrMetaDataInfo = prMetaDataStore.getState().setPrMetaData;
  const setIsCreator = userMediaStore.getState().setIsCreator;
  const setCommitFileList = fileSysyemStore.getState().setCommitFileList;
  const setCommentsList = fileSysyemStore.getState().setCommentsList;

  return new Promise<boolean>((resolve) =>
    socket
      .on("invite-accepted", async ({ prUrl, role }: InviteAcceptedRespone) => {
        const { owner, repo, prNumber } = extractGitHubPrDetails({
          ghPrLink: prUrl,
        });
        setPrMetaDataInfo({
          owner,
          repo,
          prNumber: +prNumber,
          prUrl,
        });
        setIsCreator(role === "creator");
        socket.emit("share-peer-id", {
          peerId: SocketManager.getInstance().peerConnection.id,
        });
        await setCommitFileList({ owner, prNumber: +prNumber, repo, prUrl })
          .then(() => {
            setCommentsList({ owner, prNumber: +prNumber, repo });
            resolve(true);
            setIsCreator(true);
          })
          .catch((error) => {
            alert("Error: " + error);
          });
        resolve(true);
      })
      .on("invite-rejected", () => {
        alert("Invite Rejected");
        resolve(false);
      }),
  );
};
