// import { useParams } from "react-router-dom";

import { CodeEditor } from "@/components/CodeEditor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const ConversationPage = () => {
  // const { conversationId } = useParams<{ conversationId: string }>();

  return (
    <div className="flex h-screen flex-col">
      <div className="flex h-full">
        <div className="w-16 bg-blue-200">left sidebar</div>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20}>left pannal</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={80}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={70}>
                <CodeEditor initialValue="// hello world" />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={30}>
                bottom commit pannal
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="bg-blue-400 p-1">bottom status</div>
    </div>
  );
};

export default ConversationPage;
