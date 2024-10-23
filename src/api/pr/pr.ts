import {
  GetFileDataParams,
  GetPrDataParams,
  GitHubFileChange,
  GitHubPrResponse,
} from "@/types/pr";
import axios from "axios";

const PR_BASE_URL = import.meta.env.VITE_PR_URL;

export const getPrData = async ({
  owner,
  repo,
  prNumber,
}: GetPrDataParams): Promise<GitHubPrResponse> => {
  const response = await axios.get(
    `${PR_BASE_URL}/repos/${owner}/${repo}/pulls/${prNumber}`,
  );
  return response.data;
};

export const getPrCommitsData = async ({
  owner,
  repo,
  prNumber,
}: GetPrDataParams): Promise<GitHubFileChange[]> => {
  const response = await axios.get(
    `${PR_BASE_URL}/repos/${owner}/${repo}/pulls/${prNumber}/files`,
  );
  return response.data;
};

export const getFileData = async ({
  owner,
  repo,
  branchName,
  fileName,
}: GetFileDataParams): Promise<any> => {
  const response = await axios.get(
    `${PR_BASE_URL}/raw/${owner}/${repo}/${branchName}/${fileName}`,
  );
  return response.data;
};
