import { PrChangedFileInfo } from "@/stores/github.store";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";
const YJS_SOCKET = import.meta.env.VITE_YJS_URL || "wss://demos.yjs.dev/ws";

export const initializeYjsSocket = async ({
  roomUuid,
}: {
  roomUuid: string;
}) => {
  return new Promise<{ ydoc: Y.Doc; provider: WebsocketProvider }>(
    (resolve) => {
      const ydoc = new Y.Doc();
      const provider = new WebsocketProvider(YJS_SOCKET, roomUuid, ydoc, {
        connect: true,
        maxBackoffTime: 2500,
      });
      provider.on("status", (event: { status: string }) => {
        if (event.status === "connected") {
          resolve({ ydoc, provider });
        }
      });
    },
  );
};

export const initFileStructSync = (
  ydoc: Y.Doc,
  provider: WebsocketProvider,
  commitFileList: PrChangedFileInfo[],
  initCommitFileList: (commitFileList: PrChangedFileInfo[]) => void,
) => {
  const fileMetadata = ydoc.getArray<PrChangedFileInfo>("fileMetadata");
  provider.on("sync", (isSynced: boolean) => {
    if (isSynced) {
      // 방장인 경우: 파일 메타데이터 공유
      if (commitFileList?.length && fileMetadata.length === 0) {
        // 기존 배열을 비우고
        fileMetadata.delete(0, fileMetadata.length);

        // 각 파일의 메타데이터를 개별적으로 push
        commitFileList.forEach((file) => {
          fileMetadata.push([
            {
              filename: file.filename,
              language: file.language || "plaintext",
              status: file.status,
              additions: file.additions || 0,
              deletions: file.deletions || 0,
              afterContent: file.afterContent || "",
              beforeContent: file.beforeContent || "",
            },
          ]);
        });
      } else if (commitFileList.length === 0 && fileMetadata.length > 0) {
        const files = fileMetadata
          .toArray()
          .map((metadata: PrChangedFileInfo) => ({
            filename: metadata.filename,
            language: metadata.language,
            status: metadata.status,
            beforeContent: metadata.beforeContent,
            afterContent: metadata.afterContent,
            additions: metadata.additions,
            deletions: metadata.deletions,
          }));

        initCommitFileList(files);
      }
    }
  });
};

export const RemoteCursorIndicator = (
  clientId: number,
  user: {
    name: string;
    color: string;
  },
) => {
  return `
  .yRemoteSelectionHead-${clientId} {
    border: 2px solid ${user.color};
    position: relative;
  }
  .yRemoteSelectionHead-${clientId}::before {
    content: '${user.name}';
    color: white;
    top: -15px;
    position: absolute;
    left: -2px;
    background-color: ${user.color};
    font-size: 12px;
    padding: 4px 4px 2px 2px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top-left-radius: 5px;
  }
`;
};
