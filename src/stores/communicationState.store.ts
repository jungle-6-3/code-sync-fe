
import { create } from "@/lib/zustand";
import { userMediaStore } from '@/stores/userMedia.store';
import { SocketManager } from '@/lib/socketManager';
import { addInviteAcceptedListener } from '@/lib/socket';

type LifecycleStage =
  | 'init' // 방 생성하기: 방 생성 및 고유 ID, 사용자 정보 초기화
  | 'ready' // 카메라 점검하기: 카메라 및 마이크 권한 요청, 미디어 상태 확인
  | 'staging' // 소켓 연결 및 데이터 초기화: WebRTC, Yjs, socket.io 연결 및 GitHub 데이터 가져오기
  | 'waiting' // 상대방 기다리기: 상대방 접속 대기 및 로딩 상태 표시
  | 'running' // 회의 중: 화상 회의, 채팅, 동시 편집 활성화
  | 'saving' // 회의 내용 저장하기: 서버 또는 GitHub에 회의 내용 저장
  | 'finishing'; // Clean up 작업: 모든 연결 종료 및 방 제거

interface CommunicationState {
  stage: LifecycleStage;
  isReconnecting: boolean;
  roomUuid?: string;
  onInit: () => void;
  onReady: (roomUuid: string) => void;
  onStaging: () => Promise<boolean>;
  onWaiting: () => void;
  onRunning: () => void;
  onSaving: () => void;
  onFinishing: () => void;
  isSocketManagerReady: boolean;
}

export const useCommunicationStore = create<CommunicationState>()((set, get) => ({
  stage: 'init',
  isSocketManagerReady: false,
  isReconnecting: false,
  onInit: () => {
    if (get().isSocketManagerReady) {
      SocketManager.getInstance().disconnectAllSockets();
    }
    userMediaStore.getState().removeWebcam();
    set({ stage: 'init', isSocketManagerReady: false })
  },
  onReady: (roomUuid) => {
    if (get().isSocketManagerReady) {
      SocketManager.getInstance().disconnectAllSockets();
    }
    userMediaStore.getState().removeWebcam();
    set({ stage: 'ready', roomUuid, isSocketManagerReady: false })
  },
  onStaging: async () => {
    const roomUuid = get().roomUuid;
    await SocketManager.getInstance(roomUuid).ready();
    set({ stage: 'staging', isSocketManagerReady: true });
    return await addInviteAcceptedListener({
      socket: SocketManager.getInstance().socketIOSocket,
    })
  },
  onRunning: () => set({ stage: 'running' }),
  onWaiting: () => set({ stage: 'waiting' }),
  onSaving: () => {
    userMediaStore.setState({ isShowWebcam: false })
    userMediaStore.getState().removeWebcam();
    set({ stage: 'saving' })
  },
  onFinishing: () => {
    if (get().isSocketManagerReady) {
      SocketManager.getInstance().disconnectAllSockets();
    }
    set({ stage: 'finishing', isSocketManagerReady: false });
    set({ stage: 'init', isSocketManagerReady: false });
  },
}));