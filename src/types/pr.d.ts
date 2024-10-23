// PR 정보 상태를 위한 인터페이스export
export interface PrInfoProps {
  requestBranch: string; // head.ref
  receiveBranch: string; // base.ref
  userId: string;
}

export interface ChangedFile {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  raw_url?: string;
}
