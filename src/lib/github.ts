import axios from "axios";

export const githubHttps = axios.create({
  baseURL: import.meta.env.VITE_PR_URL,
});

export const extractGitHubPrDetails = (value: { ghPrLink: string; }) => {
  const splitedUrl = value["ghPrLink"]
    .split("/")
    .filter((item) => item !== "");
  const owner = splitedUrl[2];
  const repo = splitedUrl[3];
  const prNumber = splitedUrl[5];
  return { owner, repo, prNumber };
}

