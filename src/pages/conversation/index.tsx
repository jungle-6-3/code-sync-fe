import { useEffect, useRef, useState } from "react";
import { ConversationCam } from "@/components/WebCam";
import ConversationPage from "@/pages/conversation/ConversationPage";
import ConversationReadyPage from "@/pages/conversation/ConversationReadyPage";
import { useNavigate, useParams } from "react-router-dom";

const ConversationJunctionPage = () => {
  const [isJoin, setIsJoin] = useState(false);
  const constraintsRef = useRef(null);
  const { conversationId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const regex =
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    if (!regex.test(conversationId || "")) {
      alert("비정상적인 접근입니다.");
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSetJoin = async () => {
    if (isJoin) return;
    setIsJoin(true);
  };

  return (
    <div ref={constraintsRef}>
      <ConversationCam containerRef={constraintsRef} />
      {isJoin ? (
        <ConversationPage />
      ) : (
        <ConversationReadyPage onSetJoin={onSetJoin} />
      )}
    </div>
  );
};

export default ConversationJunctionPage;
