import { usePreviousRoomQuery } from "@/hooks/Conversation/usePreviousRoomQuery";
import { useParams } from "react-router-dom";

const PostDetailPage = () => {
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
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="flex h-full">{/* <MainFrame /> */}</div>
    </div>
  );
};

export default PostDetailPage;
