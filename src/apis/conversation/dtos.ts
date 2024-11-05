interface UserData {
  email: string;
  name: string;
}

export interface Conversation {
  pk: number;
  // TODO : 추후에 BE가 변경될 때 이야기 하기.
  creatorPk: number;
  participantPk: number;
  //
  dataPk: number;
  title: string;
  startedAt: string;
  finishedAt: string;
  deleteAt: Date;
  creator: UserData;
  participant: UserData;
}

export interface Data {
  total: number;
  conversations: Conversation[];
}

export interface GetPreviousRoomResponseDto {
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
