import { lazy, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ConversationCam } from "@/components/WebCam";
import { useCommunicationStore } from "@/stores/communicationState.store";

const ConversationPage = lazy(
  () => import("@/pages/conversation/ConversationPage"),
);
const ConversationReadyPage = lazy(
  () => import("@/pages/conversation/ConversationReadyPage"),
);

const ConversationJunctionPage = () => {
  const { conversationId } = useParams();
  const [isJoin, setIsJoin] = useState(false);
  const constraintsRef = useRef(null);
  const navigate = useNavigate();
  const onFinishing = useCommunicationStore((state) => state.onFinishing);

  useEffect(() => {
    const regex =
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    if (!regex.test(conversationId || "")) {
      alert("비정상적인 접근입니다.");
      navigate("/");
    }
    return () => {
      onFinishing();
    };
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
