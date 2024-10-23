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
  branchName,
  fileName,
}: GetFileDataParams) => {
  const response = await githubHttps.get(
    `/raw/${owner}/${repo}/${branchName}/${fileName}`,
  );
  return response.data;
};
