import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ConversationCam } from "@/components/WebCam";
import ConversationPage from "@/pages/conversation/ConversationPage";
import ConversationReadyPage from "@/pages/conversation/ConversationReadyPage";
import { useCommunicationStore } from "@/stores/communicationState.store";
import { StepType, TourProvider } from "@reactour/tour";

const steps: StepType[] = [
  {
    selector: ".first-step",
    content: "탐색기, 채팅, 노트, 그림판 기능이 있어요.",
    padding: 0,
    bypassElem: false,
  },
  {
    selector: ".second-step",
    content: "파일 바뀐 리스트에요. \n각 셀을 클릭하여 파일을 볼 수 있어요.",
    padding: 0,
    actionAfter: (elem) => {
      const file = elem?.querySelector("tbody tr:first-child") as HTMLElement;
      console.log(file);
      file?.click();
    },
  },
  {
    selector: ".third-step",
    content:
      "화면 동기화 버튼을 눌러 상대방이 보고 있는 파일로 이동할 수 있어요.",
    padding: 0,
  },
  {
    selector: ".fourth-step",
    content: "이미지로 추출을 눌러 그림판으로 이동할 수 있어요.",
    padding: 0,
  },
];

const ConversationJunctionPage = () => {
  const [isJoin, setIsJoin] = useState(false);
  const constraintsRef = useRef(null);
  const { conversationId } = useParams();
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
        <TourProvider
          steps={steps}
          onClickMask={(clickEvent) => clickEvent.setIsOpen(true)}
        >
          <ConversationPage />
        </TourProvider>
      ) : (
        <ConversationReadyPage onSetJoin={onSetJoin} />
      )}
    </div>
  );
};

export default ConversationJunctionPage;
