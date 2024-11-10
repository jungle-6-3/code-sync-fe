import ConversationSaveChatViewer from "@/components/Conversation/Save/Chatting";
import ConversationSaveDrawBoardViewer from "@/components/Conversation/Save/DrawBoard";
import ConversationSaveHeader from "@/components/Conversation/Save/Header";
import ConversationSaveNoteViewer from "@/components/Conversation/Save/NoteViewer";
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
  const setDrawBoardYdoc = usePreviousRoomStore(
    (state) => state.setDrawBoardYdoc,
  );
  const [drawBoardData, noteData, chatData, voiceData] = useFetchers([
    roomData.drawBoard.url,
    roomData.note.url,
    roomData.chat.url,
    roomData.voice.url,
  ]);

  useEffect(() => {
    setNoteYdoc(new Y.Doc());
    setDrawBoardYdoc(new Y.Doc());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ConversationSaveHeader />
      <Tabs defaultValue="note">
        <TabsList>
          <TabsTrigger value="note">Note</TabsTrigger>
          <TabsTrigger value="drawBoard">DrawBoard</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>
        <TabsContent value="drawBoard">
          <ConversationSaveDrawBoardViewer data={drawBoardData.data.data} />
        </TabsContent>
        <TabsContent value="note">
          <ConversationSaveNoteViewer data={noteData.data.data} />
        </TabsContent>
        <TabsContent value="chat">
          <ConversationSaveChatViewer
            chats={chatData.data.data}
            voice={voiceData.data.data.voiceChats}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ConversationSaveTabs;
