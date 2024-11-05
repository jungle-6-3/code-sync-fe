import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ConversationSaveHeaderProps {
  initialTitle?: string;
}

const ConversationSaveHeader = ({
  initialTitle,
}: ConversationSaveHeaderProps) => {
  return (
    <div className="mb-6 flex justify-between">
      <div className="flex items-center">
        <span className="min-w-12 text-lg">제목: </span>
        <Input defaultValue={initialTitle} />
      </div>
      <div className="flex gap-4">
        <Button variant="secondary">홈으로</Button>
        <Button>저장하기</Button>
      </div>
    </div>
  );
};

export default ConversationSaveHeader;
