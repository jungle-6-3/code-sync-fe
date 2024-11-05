import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

interface ConversationSaveHeaderProps {
  initialTitle?: string;
}

const ConversationSaveHeader = ({
  initialTitle,
}: ConversationSaveHeaderProps) => {
  return (
    <div className="flex justify-between pb-6">
      <div className="flex items-center">
        <span className="min-w-12 text-lg">제목: </span>
        <Input defaultValue={initialTitle} />
      </div>
      <div className="flex gap-4">
        <Button variant="secondary">홈으로</Button>
        <Button asChild>
          <Link to="/room">저장하기</Link>
        </Button>
      </div>
    </div>
  );
};

export default ConversationSaveHeader;
