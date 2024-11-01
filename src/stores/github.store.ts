import { create } from "zustand";
import { getFileContent, getPrCommitsData, getPrData } from "@/apis/pr/pr";
import { getLanguageFromFileName } from "@/lib/file";

interface PrInfoProps {
  userId: string;
  requireUserInfo: PrUserInfo;
  requestUserInfo: PrUserInfo;
}

export interface PrMetaDataInfo {
  prUrl?: string;
  owner: string;
  repo: string;
  prNumber: number;
}

interface PrUserInfo {
  owner: string;
  branchName: string;
  commitHash: string;
}

interface PrInfoPropsStore {
  prInfo: PrInfoProps;
  setPrInfo: (prInfo: PrInfoProps) => void;
  resetPrInfo: () => void;
}

interface prMetaDataPropsStore {
  prMetaData: PrMetaDataInfo;
  setPrMetaData: (newPrMetaData: PrMetaDataInfo) => void;
  resetPrMeTaData: () => void;
}

export interface PrChangedFileStatusInfo {
  status: "init" | "modified" | "added" | "removed" | "renamed";
}
export interface PrChangedFileInfo extends PrChangedFileStatusInfo {
  filename: string;
  language: string;
  additions: number;
  deletions: number;
  afterContent: string;
  beforeContent: string;
}

interface fileSysyemPropsStore {
  selectedCommitFile: PrChangedFileInfo;
  commitFileList: PrChangedFileInfo[];
  clickedFileList: PrChangedFileInfo[];
  setSelectedCommitFile: (newFile: PrChangedFileInfo) => void;
  setCommitFileList: (prMetaData: PrMetaDataInfo) => Promise<void>;
  addClickedFileList: (newFile: PrChangedFileInfo) => void;
  removeClickedFileList: (newFile: PrChangedFileInfo) => void;
}

export const prMetaDataStore = create<prMetaDataPropsStore>()((set) => ({
  prMetaData: {
    owner: "",
    repo: "",
    prNumber: 0,
    prUrl: "",
  },
  setPrMetaData: (newPrMetaData) => {
    set({ prMetaData: newPrMetaData });
  },
  resetPrMeTaData: () =>
    set({ prMetaData: { owner: "", repo: "", prNumber: 0 } }),
}));

export const prInfoStore = create<PrInfoPropsStore>()((set) => ({
  prInfo: {
    userId: "",
    requireUserInfo: {
      owner: "",
      branchName: "",
      commitHash: "",
    },
    requestUserInfo: {
      owner: "",
      branchName: "",
      commitHash: "",
    },
  },
  setPrInfo: (prInfoData) => set({ prInfo: prInfoData }),
  resetPrInfo: () =>
    set({
      prInfo: {
        userId: "",
        requireUserInfo: {
          owner: "",
          branchName: "",
          commitHash: "",
        },
        requestUserInfo: {
          owner: "",
          branchName: "",
          commitHash: "",
        },
      },
    }),
}));

export const fileSysyemStore = create<fileSysyemPropsStore>()((set, get) => ({
  selectedCommitFile: {
    filename: "",
    status: "init",
    language: "",
    additions: 0,
    deletions: 0,
    afterContent: "",
    beforeContent: "",
  },
  commitFileList: [],
  clickedFileList: [],
  setSelectedCommitFile: (newFile) => {
    set((state) => {
      const isFileInList = state.clickedFileList.some(
        (file) => file.filename === newFile.filename,
      );
      return {
        selectedCommitFile: newFile,
        clickedFileList: isFileInList
          ? state.clickedFileList
          : [...state.clickedFileList, newFile],
      };
    });
  },
  addClickedFileList: (newFile) =>
    set((state) => ({
      clickedFileList: [...state.clickedFileList, newFile],
    })),
  removeClickedFileList: (removeFile) =>
    set((state) => {
      const updateClickedFileList = state.clickedFileList.filter(
        (file) => file.filename !== removeFile.filename,
      );
      if (state.selectedCommitFile.filename === removeFile.filename) {
        const newSelectedFile =
          updateClickedFileList.length > 0
            ? updateClickedFileList[updateClickedFileList.length - 1]
            : {
                filename: "",
                status: "init" as PrChangedFileStatusInfo["status"],
                language: "",
                additions: 0,
                deletions: 0,
                afterContent: "",
                beforeContent: "",
              };
        get().setSelectedCommitFile(newSelectedFile);
      }
      return { clickedFileList: updateClickedFileList };
    }),
  setCommitFileList: async ({ owner, repo, prNumber }) => {
    try {
      const prResponse = await getPrData({ owner, repo, prNumber });
      const [requireUser, requireBranchName] = prResponse.head.label.split(":");
      const [requestOwner, requestBranchName] =
        prResponse.base.label.split(":");
      const requireSha = prResponse.head.sha;
      const requesteSha = prResponse.base.sha;
      prMetaDataStore.getState().setPrMetaData({
        owner,
        repo,
        prNumber,
        prUrl: prResponse.html_url,
      });
      const prInfoData: PrInfoProps = {
        userId: prResponse.user.login,
        requireUserInfo: {
          owner: requireUser,
          branchName: requireBranchName,
          commitHash: requireSha,
        },
        requestUserInfo: {
          owner: requestOwner,
          branchName: requestBranchName,
          commitHash: requesteSha,
        },
      };

      prInfoStore.getState().setPrInfo(prInfoData);

      const fetchCommitsData = await getPrCommitsData({
        owner,
        repo,
        prNumber,
      });
      const processedFiles = await Promise.all(
        fetchCommitsData.map(async (commit) => {
          let beforeContent = "";
          let afterContent = "";
          try {
            if (commit.status === "modified") {
              const beforeContentResponse = await getFileContent(
                prInfoData.requestUserInfo.owner,
                repo,
                prInfoData.requestUserInfo.commitHash,
                commit.filename,
              );
              beforeContent =
                typeof beforeContentResponse === "object"
                  ? JSON.stringify(beforeContentResponse, null, 2)
                  : beforeContentResponse;
            }

            if (commit.status === "added" || commit.status === "modified") {
              const afterContentResponse = await getFileContent(
                prInfoData.requireUserInfo.owner,
                repo,
                prInfoData.requireUserInfo.commitHash,
                commit.filename,
              );
              afterContent =
                typeof afterContentResponse === "object"
                  ? JSON.stringify(afterContentResponse, null, 2)
                  : afterContentResponse;
            }
          } catch (error) {
            console.warn(
              `Failed to get content for file ${commit.filename}:`,
              error,
            );
          }

          return {
            filename: commit.filename,
            status: commit.status,
            language: getLanguageFromFileName(
              String(commit.filename.split(".").at(-1)),
            ),
            additions: commit.additions,
            deletions: commit.deletions,
            afterContent,
            beforeContent,
          };
        }),
      );
      set({ commitFileList: processedFiles });
    } catch (error) {
      console.error("PR 데이터 가져오기 실패", error);
      set({ commitFileList: [] });
      throw new Error("PR 데이터 가져오기 실패");
    }
  },
}));
