import { create } from "zustand";
import { getFileContent, getPrCommitsData, getPrData } from "@/apis/pr/pr";
import { getLanguageFromFileName } from "@/lib/file";

interface PrInfoProps {
  userId: string;
  requireUserInfo: PrUserInfo;
  requestUserInfo: PrUserInfo;
}

interface PrUserInfo {
  owner: string;
  branchName: string;
}

export interface PrChangedFileInfo {
  filename: string;
  status: "init" | "modified" | "added" | "removed" | "renamed";
  language: string;
  additions: number;
  deletions: number;
  afterContent: string;
  beforeContent: string;
}

export interface PrMetaDataInfo {
  owner: string;
  repo: string;
  prNumber: number;
}

interface PrInfoPropsStore {
  prInfo: PrInfoProps;
  setPrInfo: (prInfo: PrInfoProps) => void;
  resetPrInfo: () => void; // 누락된 타입 추가
}
interface fileSysyemPropsStore {
  selectedFile: PrChangedFileInfo;
  prChangedFileList: PrChangedFileInfo[];
  setSelectedFile: (newFile: PrChangedFileInfo) => void;
  setPrChangedFileList: (prMetaData: PrMetaDataInfo) => Promise<void>;
}

interface prMetaDataPropsStore {
  prMetaData: PrMetaDataInfo;
  setPrMetaData: (newPrMetaData: PrMetaDataInfo) => void;
  resetPrMeTaData: () => void;
}

export const prMetaDataStore = create<prMetaDataPropsStore>()((set) => ({
  prMetaData: {
    owner: "",
    repo: "",
    prNumber: 0,
  },
  setPrMetaData: (newPrMetaData) => set({ prMetaData: newPrMetaData }),
  resetPrMeTaData: () =>
    set({ prMetaData: { owner: "", repo: "", prNumber: 0 } }),
}));

export const prInfoStore = create<PrInfoPropsStore>()((set) => ({
  prInfo: {
    userId: "",
    requireUserInfo: {
      owner: "",
      branchName: "",
    },
    requestUserInfo: {
      owner: "",
      branchName: "",
    },
  },
  setPrInfo: (newPrInfo) => set({ prInfo: newPrInfo }),
  resetPrInfo: () =>
    set({
      prInfo: {
        userId: "",
        requireUserInfo: {
          owner: "",
          branchName: "",
        },
        requestUserInfo: {
          owner: "",
          branchName: "",
        },
      },
    }),
}));

export const fileSysyemStore = create<fileSysyemPropsStore>()((set) => ({
  selectedFile: {
    filename: "",
    status: "init",
    language: "",
    additions: 0,
    deletions: 0,
    afterContent: "",
    beforeContent: ",",
  },
  prChangedFileList: [],
  setSelectedFile: (newFile) => set({ selectedFile: newFile }),
  setPrChangedFileList: async ({
    owner,
    repo,
    prNumber,
  }: {
    owner: string;
    repo: string;
    prNumber: number;
  }) => {
    const response = await getPrData({
      owner,
      repo,
      prNumber,
    });
    const [requireUser, requireBranchName] = response.head.label.split(":");
    const [requestOner, requestBranchName] = response.base.label.split(":");
    const newPrInfo = {
      userId: response.user.login,
      requireUserInfo: {
        owner: requireUser,
        branchName: requireBranchName,
      },
      requestUserInfo: {
        owner: requestOner,
        branchName: requestBranchName,
      },
    };

    prInfoStore.getState().setPrInfo(newPrInfo);

    const fetchCommitsData = await getPrCommitsData({ owner, repo, prNumber });
    const processedFiles = await Promise.all(
      fetchCommitsData.map(async (commit) => {
        let beforeContent;
        let afterContent;
        if (commit.status === "modified") {
          try {
            beforeContent = await getFileContent(
              newPrInfo.requestUserInfo.owner,
              repo,
              newPrInfo.requestUserInfo.branchName,
              commit.filename,
            );
          } catch (e: unknown) {
            beforeContent = "";
          }
        }
        if (commit.status === "added" || commit.status === "modified") {
          try {
            afterContent = await getFileContent(
              newPrInfo.requireUserInfo.owner,
              repo,
              newPrInfo.requireUserInfo.branchName,
              commit.filename,
            );
          } catch (e: unknown) {
            afterContent = "";
          }
        }
        beforeContent =
          typeof beforeContent === "object"
            ? JSON.stringify(beforeContent, null, 2)
            : beforeContent;

        afterContent =
          typeof afterContent === "object"
            ? JSON.stringify(afterContent, null, 2)
            : afterContent;

        return {
          filename: commit.filename,
          status: commit.status,
          language: getLanguageFromFileName(
            String(commit.filename.split(".").at(-1)),
          ),
          additions: commit.additions,
          deletions: commit.deletions,
          afterContent: afterContent || "",
          beforeContent: beforeContent || "",
        };
      }),
    );
    set({ prChangedFileList: processedFiles });
  },
}));
