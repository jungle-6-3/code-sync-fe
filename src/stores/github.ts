import { getFileContent, getPrCommitsData, getPrData } from "@/api/pr/pr";
import { create } from "zustand";

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
        const beforeContent = await getFileContent(
          newPrInfo.requireUserInfo.owner, // userId 대신 owner 사용
          repo,
          newPrInfo.requireUserInfo.branchName,
          commit.filename,
        );
        const afterContent = await getFileContent(
          newPrInfo.requestUserInfo.owner, // userId 대신 owner 사용
          repo,
          newPrInfo.requestUserInfo.branchName,
          commit.filename,
        );
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
