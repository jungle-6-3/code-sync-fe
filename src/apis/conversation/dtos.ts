interface UserData {
  email: string;
  name: string;
}
export class GetPreviousRoomsResponseDto {
  success: boolean;
  data: {
    total: number;
    conversations: {
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
      conversationDatas: {
        uuid: string;
        canShared: boolean;
      }
    }[];
  };
  constructor({ success, data }: {
    success: boolean; data: {
      total: number, conversations: {
        pk: number;
        creatorPk: number;
        participantPk: number;
        dataPk: number;
        title: string;
        startedAt: string;
        finishedAt: string;
        deleteAt: Date;
        creator: UserData;
        participant: UserData;
        conversationDatas: {
          uuid: string;
          canShared: boolean;
        }
      }[];
    }
  }) {
    this.success = success;
    this.data = {
      total: data.total,
      conversations: data.conversations.map(conversation => ({
        pk: conversation.pk,
        creatorPk: conversation.creatorPk,
        participantPk: conversation.participantPk,
        dataPk: conversation.dataPk,
        title: conversation.title,
        startedAt: new Date(conversation.startedAt),
        finishedAt: new Date(conversation.finishedAt),
        deleteAt: new Date(conversation.deleteAt),
        creator: conversation.creator,
        participant: conversation.participant,
        conversationDatas: conversation.conversationDatas,
      }))
    };
  }
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


export interface GetPreviousRoomResponseDto {
  chat: {
    url: string,
    isShared: boolean
  },
  note: {
    url: string,
    isShared: boolean
  },
  drawBoard: {
    url: string,
    isShared: boolean
  },
  voice: {
    url: string,
    isShared: boolean
  },
  canShared: boolean;
}

