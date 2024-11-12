import ConversationShareChatViewer from "@/components/Conversation/Detail/DetailChatting";
import ConversationShareDrawBoardViewer from "@/components/Conversation/Detail/DetailDrawBoard";
import ConversationShareHeader from "@/components/Conversation/Detail/DetailHeader";
import ConversationShareNoteViewer from "@/components/Conversation/Detail/DetailNoteViewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePreviousShareRoomQuery } from "@/hooks/Conversation/usePreviousRoomQuery";
import { useFetchers } from "@/hooks/useFetcher";
import { useParams } from "react-router-dom";

const ConversationShareTabs = () => {
  const { shareId } = useParams();
  console.log(shareId);
  if (!shareId) throw new Error("shareId is required");
  const { shareData } = usePreviousShareRoomQuery(shareId);
  const [drawBoardData, noteData, chatData, voiceData] = useFetchers([
    shareData.drawBoard.url,
    shareData.note.url,
    shareData.chat.url,
    shareData.voice.url,
  ]);
  console.log(shareData);

  return (
    <>
      <ConversationShareHeader />
      <Tabs defaultValue="note">
        <TabsList>
          <TabsTrigger value="note">Note</TabsTrigger>
          <TabsTrigger value="drawBoard">DrawBoard</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>
        <TabsContent value="drawBoard">
          <ConversationShareDrawBoardViewer data={drawBoardData.data.data} />
        </TabsContent>
        <TabsContent value="note">
          <ConversationShareNoteViewer data={noteData.data.data} />
        </TabsContent>
        <TabsContent value="chat">
          <ConversationShareChatViewer
            chats={chatData.data.data}
            voice={voiceData.data.data.voiceChats}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ConversationShareTabs;
