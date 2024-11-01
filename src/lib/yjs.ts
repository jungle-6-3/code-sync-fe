import { PrChangedFileInfo } from '@/stores/github.store';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';

export const initFileStructSync = (ydoc: Y.Doc, provider: WebsocketProvider,
  commitFileList: PrChangedFileInfo[], initCommitFileList: (commitFileList: PrChangedFileInfo[]) => void) => {
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
}