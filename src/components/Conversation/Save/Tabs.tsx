import ConversationSaveDrawBoardViewer from "@/components/Conversation/Save/DrawBoard";
import ConversationSaveHeader from "@/components/Conversation/Save/Header";
import ConversationSaveNoteViewer from "@/components/Conversation/Save/NoteViewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePreviousRoomQuery } from "@/hooks/Conversation/usePreviousRoomQuery";
import { useParams } from "react-router-dom";

const ConversationSaveTabs = () => {
  const { postId } = useParams();
  if (!postId) throw new Error("postId is required");
  const { isError, isLoading, roomData } = usePreviousRoomQuery(postId);

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
      <Tabs defaultValue="drawBoard">
        <TabsList>
          <TabsTrigger value="drawBoard">DrawBoard</TabsTrigger>
          <TabsTrigger value="note">Note</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>
        <TabsContent value="drawBoard">
          <ConversationSaveDrawBoardViewer data={roomData.drawBoard} />
        </TabsContent>
        <TabsContent value="note">
          <ConversationSaveNoteViewer data={roomData.note} />
        </TabsContent>
        <TabsContent value="note">
          <div>Chat</div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ConversationSaveTabs;
