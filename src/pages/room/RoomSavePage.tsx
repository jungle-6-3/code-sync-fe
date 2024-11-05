import {
  ConversationSaveHeader,
  ConversationSaveTabs,
} from "@/components/Conversation/Save";

const RoomSavePage = () => {
  return (
    <div className="px-24 pb-6 pt-12">
      <ConversationSaveHeader />
      <ConversationSaveTabs />
    </div>
  );
};

export default RoomSavePage;
