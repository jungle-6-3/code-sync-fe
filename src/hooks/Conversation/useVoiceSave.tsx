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
  let startTime;

  // 음성 인식 중 발생하는 이벤트 처리
  recognition.onresult = (event) => {
    console.log(event);
    let finalTranscript = "";
    let interimTranscript = "";

    console.log(event.results[0][0].transcript);

    for (let i = event.resultIndex; i < event.results.length; i++) {
      console.log(event.results[i].isFinal);
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
    console.log("Recognized Text:", messageData);

    socket.emit(
      "send-voice-text",
      messageData,
      (res: { success: boolean; message: string }) => {
        console.log("서버 응답 메세지:", res.message);
      },
    );
  };

  recognition.onend = () => {
    console.log("Speech recognition service disconnected");
    if (isRecognizing && micStatus) {
      recognition.start();
    }
  };

  recognition.onnomatch = () => {
    console.error("Speech not recognized");
  };

  recognition.onspeechstart = () => {
    console.log("Speech has been detected");
    startTime = Date.now();
    console.log("음성 인식 시작 시간:", new Date(startTime).toISOString());
  };

  recognition.onstart = () => {
    console.log("Speech recognition service has started");
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
  }, [micStatus]);
};
