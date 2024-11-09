interface ConversationSaveVoiceViewerProps {
    voice: {
      date: string;
      name: string;
      email: string;
      message: string;
    }[];
  }
  
  const ConversationSaveVoiceViewer = ({
    voice,
  }: ConversationSaveVoiceViewerProps) => {
    return (
      <div className="h-[calc(100vh-16rem)] py-2">
        <div>
          {voice.map((voice) => {
            return (
              <div key={voice.date} className="flex gap-4 py-1">
                <div className="flex w-1/12 items-center justify-center rounded border">
                  {voice.name}
                </div>
                <div className="w-11/12 rounded border px-4 py-1">
                  {voice.message}
                  <div>{voice.date}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  export default ConversationSaveVoiceViewer;
  