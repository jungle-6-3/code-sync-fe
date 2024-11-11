import { Suspense } from "react";
import { Link } from "react-router-dom";
import { ConversationSaveTabs } from "@/components/Conversation/Save";

const RoomSavePage = () => {
  return (
    <>
      <div className="h-24 py-8">
        <Link
          to="/room/create"
          className="ml-12 flex w-fit items-center gap-4 p-4"
        >
          <img
            src="/favicon.png"
            alt="facivon"
            className="h-8 w-8"
            loading="lazy"
          />
          <div className="text-lg">Code-Sync</div>
        </Link>
      </div>
      <div className="px-24 pb-6 pt-6">
        <Suspense>
          <ConversationSaveTabs />
        </Suspense>
      </div>
    </>
  );
};

export default RoomSavePage;
