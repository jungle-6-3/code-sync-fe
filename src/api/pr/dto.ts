
export interface GitHubPrResponse {
  url: string;
  id: number;
  number: number;
  state: "open" | "closed";
  title: string;
  user: GitHubUser;
  body: string;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  merged_at: string | null;
  merge_commit_sha: string;
  head: GithubRepositoryReport;
  base: GithubRepositoryReport;
  merged: boolean;
  mergeable: boolean | null;
  mergeable_state: string;
  merged_by: GitHubUser | null;
  comments: number;
  review_comments: number;
  commits: number;
  additions: number;
  deletions: number;
  changed_files: number;
}

// GitHub 사용자 정보 인터페이스
export interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  url: string;
  html_url: string;
  type: string;
  site_admin: boolean;
}

interface GithubRepositoryReport {
  label: string;
  ref: string; // PR의 source branch
  sha: string;
  user: GitHubUser;
  repo: GitHubRepository;
};

// GitHub 저장소 정보 인터페이스
export interface GitHubRepository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: GitHubUser;
  html_url: string;
  description: string | null;
  fork: boolean;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  default_branch: string;
}

export interface GitHubFileChangeResponse {
  sha: string;
  filename: string;
  status: "modified" | "added" | "removed" | "renamed";
  additions: number;
  deletions: number;
  changes: number;
  blob_url: string;
  raw_url: string;
  contents_url: string;
  patch?: string;
  previous_filename?: string;
}

export interface GetFileDataParams {
  owner: string;
  repo: string;
  branchName: string;
  fileName: string;
}


export interface GetPrDataParams {
  owner: string;
  repo: string;
  prNumber: number;
}
