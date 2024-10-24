import { create } from "zustand";
import { getFileContent, getPrCommitsData, getPrData } from "@/api/pr/pr";

interface PrInfoProps {
  userId: string;
  requireUserInfo: PrUserInfo;
  requestUserInfo: PrUserInfo;
}

interface PrUserInfo {
  owner: string;
  branchName: string;
}

interface PrChangedFileInfo {
  filename: string;
  status: "modified" | "added" | "removed" | "renamed";
  additions: number;
  deletions: number;
  afterContent: string;
  beforeContent: string;
}

interface PrInfoPropsStore {
  prInfo: PrInfoProps;
  prChangedFileList: PrChangedFileInfo[];
  setPrInfo: (prInfo: PrInfoProps) => void;
  setPrChangedFileList: (owner: string, repo: string, prNumber: number) => void;
}

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
  prChangedFileList: [],
  setPrInfo: (newPrInfo) => set({ prInfo: newPrInfo }),
  setPrChangedFileList: async (
    owner: string,
    repo: string,
    prNumber: number,
  ) => {
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
        const beforeContent =
          commit.status === "modified"
            ? await getFileContent(
                newPrInfo.requestUserInfo.owner,
                repo,
                newPrInfo.requestUserInfo.branchName,
                commit.filename,
              )
            : "";
        const afterContent =
          commit.status === "added" || commit.status === "modified"
            ? await getFileContent(
                newPrInfo.requireUserInfo.owner,
                repo,
                newPrInfo.requireUserInfo.branchName,
                commit.filename,
              )
            : "";
        return {
          filename: commit.filename,
          status: commit.status,
          additions: commit.additions,
          deletions: commit.deletions,
          afterContent,
          beforeContent,
        };
      }),
    );
    set({ prChangedFileList: processedFiles });
  },
}));

// /raw/jungle-6-3/code-sync-fe/feat/3/src/routers/index.tsx
// https://code-sync.net/gh/raw/jungle-6-3/code-sync-fe/feat/3/src/routers/index.tsx
// https://code-sync.net/gh/raw/jungle-6-3/code-sync-fe/feat/12/src/hooks/useQuery.tsx
