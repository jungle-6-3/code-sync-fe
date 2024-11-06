import ConversationSaveChatViewer from "@/components/Conversation/Save/Chatting";
import ConversationSaveDrawBoardViewer from "@/components/Conversation/Save/DrawBoard";
import ConversationSaveHeader from "@/components/Conversation/Save/Header";
import ConversationSaveNoteViewer from "@/components/Conversation/Save/NoteViewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePreviousRoomQuery } from "@/hooks/Conversation/usePreviousRoomQuery";
import { useFetchers } from "@/hooks/useFetcher";
import { useParams } from "react-router-dom";

const ConversationSaveTabs = () => {
  const { postId } = useParams();
  if (!postId) throw new Error("postId is required");
  const { isError, isLoading, roomData } = usePreviousRoomQuery(postId);
  const [drawBoardData, noteData, chatData] = useFetchers([
    roomData.drawBoard.url,
    roomData.note.url,
    roomData.chat.url,
  ]);

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!roomData) {
    return <div>Not found</div>;
  }

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
          <ConversationSaveChatViewer chats={chatData.data.data} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ConversationSaveTabs;
