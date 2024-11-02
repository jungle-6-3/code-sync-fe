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

export interface Data {
  total: number;
  conversations: Conversation[];
}

export interface PreviousRoomResponseDto {
  success: boolean;
  data: Data;
}

export class ChattingSocketResponse {
  name: string;
  message: string;
  email: string;
  date: Date;
  constructor({
    name,
    message,
    email,
    date,
  }: {
    name: string;
    message: string;
    email: string;
    date: string;
  }) {
    this.name = name;
    this.message = message;
    this.email = email;
    this.date = new Date(date);
  }
}
