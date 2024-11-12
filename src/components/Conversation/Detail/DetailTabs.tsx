import ConversationShareChatViewer from "@/components/Conversation/Detail/DetailChatting";
import ConversationShareDrawBoardViewer from "@/components/Conversation/Detail/DetailDrawBoard";
import ConversationShareHeader from "@/components/Conversation/Detail/DetailHeader";
import ConversationShareNoteViewer from "@/components/Conversation/Detail/DetailNoteViewer";
import ConversationShareSummaryViewer from "@/components/Conversation/Detail/DetailSummary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePreviousShareRoomQuery } from "@/hooks/Conversation/usePreviousRoomQuery";
import { useFetchers } from "@/hooks/useFetcher";
import { useParams } from "react-router-dom";

const ConversationShareTabs = () => {
  const { shareId } = useParams();
  if (!shareId) throw new Error("shareId is required");
  const { shareData } = usePreviousShareRoomQuery(shareId);
  const [drawBoardData, noteData, chatData, voiceData, summaryData] =
    useFetchers([
      shareData.drawBoard.url,
      shareData.note.url,
      shareData.chat.url,
      shareData.voice.url,
      shareData.summary.url,
    ]);

  return (
    <>
      <ConversationShareHeader title={shareData.title} />
      <Tabs defaultValue="note">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="note">Note</TabsTrigger>
          <TabsTrigger value="drawBoard">DrawBoard</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
          <ConversationShareSummaryViewer data={summaryData.data.data} />
        </TabsContent>
        <TabsContent value="drawBoard">
          <ConversationShareDrawBoardViewer data={drawBoardData.data.data} />
        </TabsContent>
        <TabsContent value="note">
          <ConversationShareNoteViewer data={noteData.data.data} />
        </TabsContent>
        <TabsContent value="chat">
          <ConversationShareChatViewer
            chats={chatData.data.data}
            voice={voiceData.data.data}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ConversationShareTabs;
