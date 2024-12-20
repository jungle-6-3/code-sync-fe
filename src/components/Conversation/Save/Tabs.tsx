import ConversationSaveChatViewer from "@/components/Conversation/Save/Chatting";
import ConversationSaveDrawBoardViewer from "@/components/Conversation/Save/DrawBoard";
import ConversationSaveHeader from "@/components/Conversation/Save/Header";
import ConversationSaveNoteViewer from "@/components/Conversation/Save/NoteViewer";
import ConversationSaveSummaryViewer from "@/components/Conversation/Save/Summary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePreviousRoomQuery } from "@/hooks/Conversation/usePreviousRoomQuery";
import { useFetchers } from "@/hooks/useFetcher";
import { usePreviousRoomStore } from "@/stores/previousRoom.store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Y from "yjs";

const ConversationSaveTabs = () => {
  const { postId } = useParams();
  if (!postId) throw new Error("postId is required");
  const { roomData } = usePreviousRoomQuery(postId);
  const setNoteYdoc = usePreviousRoomStore((state) => state.setNoteYdoc);
  const setNoteIsShared = usePreviousRoomStore(
    (state) => state.setNoteIsShared,
  );
  const setDrawBoardYdoc = usePreviousRoomStore(
    (state) => state.setDrawBoardYdoc,
  );
  const setDrawIsShared = usePreviousRoomStore(
    (state) => state.setDrawIsShared,
  );
  const setVoiceIsShared = usePreviousRoomStore(
    (state) => state.setVoiceIsShared,
  );
  const setChatIsShared = usePreviousRoomStore(
    (state) => state.setChatIsShared,
  );
  const setSummaryIsShared = usePreviousRoomStore(
    (state) => state.setSummaryIsShared,
  );
  const setTitle = usePreviousRoomStore((state) => state.setTitle);
  const setCanShared = usePreviousRoomStore((state) => state.setCanShared);
  const [drawBoardData, noteData, chatData, voiceData, summaryData] =
    useFetchers([
      roomData.drawBoard.url,
      roomData.note.url,
      roomData.chat.url,
      roomData.voice.url,
      roomData.summary.url,
    ]);

  useEffect(() => {
    setNoteYdoc(new Y.Doc());
    setDrawBoardYdoc(new Y.Doc());
    setCanShared(roomData.canShared);
    setChatIsShared(roomData.chat.isShared);
    setDrawIsShared(roomData.drawBoard.isShared);
    setNoteIsShared(roomData.note.isShared);
    setVoiceIsShared(roomData.voice.isShared);
    setSummaryIsShared(roomData.summary.isShared);
    setTitle(roomData.title);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  return (
    <>
      <ConversationSaveHeader />
      <Tabs defaultValue="summary">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="note">Note</TabsTrigger>
          <TabsTrigger value="drawBoard">DrawBoard</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
          <ConversationSaveSummaryViewer data={summaryData.data.data} />
        </TabsContent>
        <TabsContent value="drawBoard">
          <ConversationSaveDrawBoardViewer data={drawBoardData.data.data} />
        </TabsContent>
        <TabsContent value="note">
          <ConversationSaveNoteViewer data={noteData.data.data} />
        </TabsContent>
        <TabsContent value="chat">
          <ConversationSaveChatViewer
            chats={chatData.data.data}
            voice={voiceData.data.data}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ConversationSaveTabs;
