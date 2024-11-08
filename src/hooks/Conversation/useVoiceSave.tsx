import { SocketManager } from "@/lib/socketManager";
import { useCommunicationStore } from "@/stores/communicationState.store";
import { useEffect } from "react";

export const useVoiceSave = (micStatus: boolean) => {
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  const isSocketManagerReady = useCommunicationStore(
    (state) => state.isSocketManagerReady,
  );

  if (!isSocketManagerReady) throw new Error("socketManager is not ready");
  const socket = SocketManager.getInstance().socketIOSocket;

  recognition.lang = "ko-KR"; // 한국어 인식
  recognition.continuous = false; // 실시간 인식
  recognition.interimResults = false; // 결과가 나오는 즉시 표시

  let isRecognizing = false; // 음성 인식 상태를 추적

  // 음성 인식 중 발생하는 이벤트 처리
  recognition.onresult = (event: SpeechRecognitionEvent) => {
    let finalTranscript = "";
    let interimTranscript = "";


    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }
    const voiceText = finalTranscript + interimTranscript;

    const messageData = {
      date: new Date().toISOString(),
      message: voiceText,
    };

    socket.emit(
      "send-voice-text",
      messageData
    );
  };

  recognition.onend = () => {
    if (isRecognizing && micStatus) {
      recognition.start();
    }
  };

  recognition.onnomatch = () => {
    console.error("Speech not recognized");
  };

  // 음성 인식 시작
  const startRecognition = () => {
    if (!isRecognizing) {
      recognition.start();
      isRecognizing = true;
    }
  };

  // 음성 인식 중지
  const stopRecognition = () => {
    if (isRecognizing) {
      recognition.stop();
      isRecognizing = false;
    }
  };

  useEffect(() => {
    if (micStatus) {
      startRecognition();
    } else {
      stopRecognition();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [micStatus]);
};
