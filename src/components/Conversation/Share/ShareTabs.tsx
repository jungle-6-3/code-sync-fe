import ConversationShareChatViewer from "@/components/Conversation/Share/ShareChatting";
import ConversationShareDrawBoardViewer from "@/components/Conversation/Share/ShareDrawBoard";
import ConversationShareHeader from "@/components/Conversation/Share/ShareHeader";
import ConversationShareNoteViewer from "@/components/Conversation/Share/ShareNoteViewer";
import ConversationShareSummaryViewer from "@/components/Conversation/Share/ShareSummary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePreviousShareRoomQuery } from "@/hooks/Conversation/usePreviousRoomQuery";
import { useFetchers } from "@/hooks/useFetcher";
import { useParams } from "react-router-dom";

const ConversationShareTabs = () => {
  const { shareId } = useParams();
  if (!shareId) throw new Error("shareId is required");
  const { shareData } = usePreviousShareRoomQuery(shareId);
  const [drawBoardData, noteData, chatData, voiceData, summaryData] =
    useFetchers(
      [
        shareData.drawBoard?.url,
        shareData.note?.url,
        shareData.chat?.url,
        shareData.voice?.url,
        shareData.summary?.url,
      ].filter((url) => url),
    );

  return (
    <>
      <ConversationShareHeader title={shareData.title} />
      <Tabs defaultValue="summary">
        <TabsList>
          {summaryData && <TabsTrigger value="summary">Summary</TabsTrigger>}
          {noteData && <TabsTrigger value="note">Note</TabsTrigger>}
          {drawBoardData && (
            <TabsTrigger value="drawBoard">DrawBoard</TabsTrigger>
          )}
          {voiceData && chatData && (
            <TabsTrigger value="chat">Chat</TabsTrigger>
          )}
        </TabsList>
        {summaryData && (
          <TabsContent value="summary">
            <ConversationShareSummaryViewer data={summaryData.data.data} />
          </TabsContent>
        )}
        {noteData && (
          <TabsContent value="drawBoard">
            <ConversationShareDrawBoardViewer data={drawBoardData.data.data} />
          </TabsContent>
        )}
        {drawBoardData && (
          <TabsContent value="note">
            <ConversationShareNoteViewer data={noteData.data.data} />
          </TabsContent>
        )}
        {voiceData && chatData && (
          <TabsContent value="chat">
            <ConversationShareChatViewer
              chats={chatData.data.data}
              voice={voiceData.data.data}
            />
          </TabsContent>
        )}
      </Tabs>
    </>
  );
};

export default ConversationShareTabs;
