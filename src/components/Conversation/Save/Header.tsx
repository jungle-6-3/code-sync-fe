import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ConversationSaveHeader = () => {
  return (
    <div className="flex justify-between px-12">
      <div className="flex items-center">
        <span className="min-w-12 text-lg">제목: </span>
        <Input />
      </div>
      <div className="flex gap-4">
        <Button variant="secondary">종료하기</Button>
        <Button>저장하기</Button>
      </div>
    </div>
  );
};

export default ConversationSaveHeader;
