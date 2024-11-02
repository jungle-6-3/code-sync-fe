import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ConversationChatting from "@/pages/conversation/ConversationChatting";

export default function PostDetailPage() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <nav className="h-full border-b p-1">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full w-full rounded-lg border"
        >
          <ResizablePanel defaultSize={20} className="h-full w-full">
            <ConversationChatting />
          </ResizablePanel>

          <ResizablePanel defaultSize={100} className="h-full w-full">
            <ResizablePanelGroup direction="vertical" className="h-full w-full">
              <ResizablePanel defaultSize={50} className="h-full w-full">
                <div className="flex h-full w-full items-center justify-center p-6">
                  <span className="font-semibold">Nothion과 비슷한 윅지위</span>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={50} className="h-full w-full">
                <div className="flex h-full w-full items-center justify-center p-6">
                  <img src="/exalidraw_test.jpg" alt="test" className = "w-full h-full" />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </nav>
    </div>
  );
}
