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
  prMetaData: PrMetaDataInfo;
  prInfo: PrInfoProps;
  selectedFile: PrChangedFileInfo;
  prChangedFileList: PrChangedFileInfo[];
  setPrMetaData: (newPrMetaData: PrMetaDataInfo) => void;
  setPrInfo: (prInfo: PrInfoProps) => void;
  setSelectedFile: (newFile: PrChangedFileInfo) => void;
  setPrChangedFileList: (owner: string, repo: string, prNumber: number) => void;
}

export const prInfoStore = create<PrInfoPropsStore>()((set) => ({
  prMetaData: {
    owner: "",
    repo: "",
    prNumber: 0,
  },
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
  setPrMetaData: (newPrMetaData) => set({ prMetaData: newPrMetaData }),
  setPrInfo: (newPrInfo) => set({ prInfo: newPrInfo }),
  setSelectedFile: (newFile) => set({ selectedFile: newFile }),
  resetPrMeTaData: () =>
    set({ prMetaData: { owner: "", repo: "", prNumber: 0 } }),
  setPrChangedFileList: async ({
    owner,
    repo,
    prNumber,
  }: {
    owner: string,
    repo: string,
    prNumber: number,
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
    set({ prInfo: newPrInfo });
    const fetchCommitsData = await getPrCommitsData({ owner, repo, prNumber });
    const processedFiles = await Promise.all(
      fetchCommitsData.map(async (commit) => {
        let beforeContent =
          commit.status === "modified"
            ? await getFileContent(
              newPrInfo.requestUserInfo.owner,
              repo,
              newPrInfo.requestUserInfo.branchName,
              commit.filename,
            )
            : "";
        let afterContent =
          commit.status === "added" || commit.status === "modified"
            ? await getFileContent(
              newPrInfo.requireUserInfo.owner,
              repo,
              newPrInfo.requireUserInfo.branchName,
              commit.filename,
            )
            : "";

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

// /raw/jungle-6-3/code-sync-fe/feat/3/src/routers/index.tsx
// https://code-sync.net/gh/raw/jungle-6-3/code-sync-fe/feat/3/src/routers/index.tsx
// https://code-sync.net/gh/raw/jungle-6-3/code-sync-fe/feat/12/src/hooks/useQuery.tsx
