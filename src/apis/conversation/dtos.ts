interface UserData {
  email: string;
  name: string;
}

export interface Conversation {
  pk: number;
  creatorPk: number;
  participantPk: number;
  dataPk: number;
  title: string;
  startedAt: Date;
  finishedAt: Date;
  deleteAt: Date;
  creator: UserData;
  participant: UserData;
}

export interface PreviousMeetingResponseDto {
  success: boolean;
  data: Conversation;
}
