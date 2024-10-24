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
    console.log(response);
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
        // modified는 수정 전 후 있기에 상관 없음
            // 수정 전 후 api 요청 필요
        // added는 이전에 데이터가 없었기에 
            // before에는 api 요청 필요 없음 after 요청은 필요
        // removed 이전 데이터는 필요 이후 데이터는 불필요
            // before에는 api 요청 필요 after에는 필요
        console.log("commit", commit);
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
        console.log(commit.filename)
        console.log("beforeContent", beforeContent);
        console.log("afterContent", afterContent);
        return {
          filename: commit.filename,
          status: commit.status,
          additions: commit.additions,
          deletions: commit.deletions,
          afterContent:
            commit.status === "removed" ? beforeContent : afterContent,
          beforeContent:
            commit.status === "added"
              ? ""
              : commit.status === "modified" || commit.status === "removed"
                ? beforeContent
                : "",
        };
      }),
    );
    console.log(processedFiles);
    set({ prChangedFileList: processedFiles });
  },
}));
