import { githubHttps } from "@/lib/github";
import {
  GetFileDataParams,
  GetPrDataParams,
  GitHubFileChangeResponse,
  GitHubPrResponse,
} from "./dto";

export const getPrData = async ({
  owner,
  repo,
  prNumber,
}: GetPrDataParams): Promise<GitHubPrResponse> => {
  const response = await githubHttps.get(
    `/repos/${owner}/${repo}/pulls/${prNumber}`,
  );
  return response.data;
};

export const getPrCommitsData = async ({
  owner,
  repo,
  prNumber,
}: GetPrDataParams): Promise<GitHubFileChangeResponse[]> => {
  const response = await githubHttps.get(
    `/repos/${owner}/${repo}/pulls/${prNumber}/files`,
  );
  return response.data;
};

export const getFileData = async ({
  owner,
  repo,
  commitHash,
  fileName,
}: GetFileDataParams) => {
  const response = await githubHttps.get(
    `/raw/${owner}/${repo}/${commitHash}/${fileName}`,
  );
  return response.data;
};

export const getFileContent = async (
  owner: string,
  repo: string,
  commitHash: string,
  fileName: string,
) => {
  const response = getFileData({
    owner,
    repo,
    commitHash,
    fileName,
  });
  return response;
};

interface CheckValidPullRequest {
  owner: string;
  repo: string;
  prNumber: string;
}

export const checkValidPullRequest = async ({
  owner,
  prNumber,
  repo,
}: CheckValidPullRequest) => {
  if (!owner || !repo || !prNumber) {
    throw new Error("Invalid URL");
  }

  const response = await githubHttps.get(
    `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`,
  );
  return response;
};
