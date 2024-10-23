import { create } from 'zustand';

// PR 정보 상태를 위한 인터페이스 export
interface PrInfoPropsStore {
  requestBranch: string; // head.ref
  receiveBranch: string; // base.ref
  userId: string;
  setPrInfo: (prInfo: PrInfoPropsStore) => void;
}

export const prInifoStore = create<PrInfoPropsStore>()((set) => ({
  requestBranch: '',
  receiveBranch: '',
  userId: '',
  setPrInfo: (prInfo) => set(prInfo),
}));




export interface ChangedFile {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  raw_url?: string;
}

