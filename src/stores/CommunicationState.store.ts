import { socketManager } from '@/lib/socketManager';
import { create } from 'zustand';

type LifecycleStage =
  | 'init'
  | 'ready'
  | 'staging'
  | 'waiting'
  | 'running'
  | 'saving'
  | 'finishing';

interface CommunicationState {
  stage: LifecycleStage;
  roomId: string | null;
  isReconnecting: boolean;

  setStage: (stage: LifecycleStage) => void;
  setRoomId: (roomId: string) => void;
  initializeSockets: (options: { roomUuid: string }) => Promise<typeof socketManager>;
  cleanupSockets: () => void;
}

export const useCommunicationStore = create<CommunicationState>((set) => ({
  stage: 'init',
  roomId: null,
  isReconnecting: false,

  setStage: (stage) => set({ stage }),
  setRoomId: (roomId) => set({ roomId }),

  initializeSockets: async ({ roomUuid }: { roomUuid: string }) => {
    await socketManager.connectAllSockets({ roomUuid });
    set({ stage: 'waiting' });
    return socketManager;
  },

  cleanupSockets: () => {
    socketManager.disconnectAllSockets();
    set({ stage: 'finishing' });
  },
}));