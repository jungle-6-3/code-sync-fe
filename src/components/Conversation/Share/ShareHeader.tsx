import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ConversationShareHeaderProps {
  title: string;
}

const ConversationShareHeader = ({ title }: ConversationShareHeaderProps) => {
  return (
    <div className="flex justify-between pb-6">
      <div className="flex items-center">
        <span className="min-w-12 text-lg">제목: {title}</span>
      </div>
      <div className="flex gap-4">
        <Button variant="secondary" asChild>
          <Link to="/room">목록으로</Link>
        </Button>
      </div>
    </div>
  );
};

export default ConversationShareHeader;
