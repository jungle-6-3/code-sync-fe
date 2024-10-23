import { GetFileDataParams, GetPrDataParams, GitHubFileChangeResponse, GitHubPrResponse } from "@/api/pr/dto";
import { githubHttps } from "@/lib/https/github";

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
}: GetFileDataParams): Promise<any> => {
  const response = await githubHttps.get(
    `/raw/${owner}/${repo}/${branchName}/${fileName}`,
  );
  return response.data;
};
