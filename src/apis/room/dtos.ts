export interface PostCreateRoomRequest {
  githubPrUrl: string;
}

export interface PostCreateRoomResponse {
  success: boolean;
  message: string;
  data: {
    roomUuid: string;
  };
}

export interface PostSaveRoomRequest {
  roomId: string;
  data: {
    isNoteURLShared: boolean;
    isDrawBoardShared: boolean;
    isCattingURLShared: boolean;
    canShared: boolean;
  };
}

export interface PostSaveRoomResponse {
  success: boolean;
  message: string;
}

export interface PostSaveMeetingRequest {
  title: string;
  isNoteShared: boolean;
  isDrawBoardShared: boolean;
  isChattingShared: boolean;
  isVoiceShared: boolean;
  canShared: boolean;
  // 아래는 추가 될 수도 아닐 수도,,
  voiceData: File;
  noteData: File;
}

export interface PostSaveMeetingResponse {
  success: boolean;
  message: string;
}

export interface PatchConversationDatasRequest {
  chat: {
    data?: string;
    isShared?: boolean;
  },
  drawBoard: {
    data?: string;
    isShared?: boolean;
  },
  note: {
    data?: string;
    isShared?: boolean;
  },
  voice: {
    data?: string;
    isShared?: boolean;
  },
  canShared?: boolean;
}