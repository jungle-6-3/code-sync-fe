import { Link } from "react-router-dom";
import PreviousRoomTable from "@/components/PreviousRoom/Table";
import PreviousRoomsPagination from "@/components/PreviousRoom/Pagination";

const PreviousRoom = () => {
  return (
    <>
      <div className="h-24 py-8">
        <Link to="/room/create" className="ml-12 flex items-center gap-4 p-4">
          <img src="/favicon.png" alt="facivon" className="h-8 w-8" />
          <div className="text-lg">Code-Sync</div>
        </Link>
      </div>
      <div className="m-auto w-full max-w-[70rem] flex-col pt-12">
        <div className="flex flex-col gap-2 border-b-2 pb-3">
          <h1 className="text-3xl font-semibold">이전 기록</h1>
        </div>
        <PreviousRoomTable />
        <div className="mt-4 flex justify-end">
          <PreviousRoomsPagination />
        </div>
      </div>
    </>
  );
};

export default PreviousRoom;
