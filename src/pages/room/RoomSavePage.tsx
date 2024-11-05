import {
  ConversationSaveHeader,
  ConversationSaveTabs,
} from "@/components/Conversation/Save";
import { usePreviousRoomQuery } from "@/hooks/Conversation/usePreviousRoomQuery";
import { useParams } from "react-router-dom";

const RoomSavePage = () => {
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
    <div className="px-24 pb-6 pt-12">
      <ConversationSaveHeader />
      <ConversationSaveTabs />
    </div>
  );
};

export default RoomSavePage;
