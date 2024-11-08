import { SocketManager } from "@/lib/socketManager";
import { useCommunicationStore } from "@/stores/communicationState.store";
import { useEffect, useRef } from "react";

export const useVoiceSave = (recordStatus: boolean) => {
  const recognition = useRef(
    new (window.SpeechRecognition || window.webkitSpeechRecognition)(),
  ).current;

  const isSocketManagerReady = useCommunicationStore(
    (state) => state.isSocketManagerReady,
  );

  if (!isSocketManagerReady) throw new Error("socketManager is not ready");
  const socket = SocketManager.getInstance().socketIOSocket;

  recognition.lang = "ko-KR"; // 한국어 인식
  recognition.continuous = false; // 실시간 인식
  recognition.interimResults = false; // 결과가 나오는 즉시 표시

  const isRecognizing = useRef(false); // 음성 인식 상태를 추적
  let startTime: number;

  // 음성 인식 중 발생하는 이벤트 처리
  recognition.onresult = (event) => {
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
      date: new Date(startTime).toISOString(),
      message: voiceText,
    };

    socket.emit("send-voice-text", messageData);
  };

  recognition.onend = () => {
    if (isRecognizing.current && recordStatus) {
      recognition.start();
    }
  };

  recognition.onnomatch = () => {
    console.error("Speech not recognized");
  };

  recognition.onspeechstart = () => {
    startTime = Date.now();
  };

  // 음성 인식 시작
  const startRecognition = () => {
    if (!isRecognizing.current) {
      recognition.start();
      isRecognizing.current = true;
    }
  };

  // 음성 인식 중지
  const stopRecognition = () => {
    if (isRecognizing.current) {
      recognition.stop();
      isRecognizing.current = false;
    }
  };

  useEffect(() => {
    if (recordStatus) {
      startRecognition();
    } else {
      stopRecognition();
    }

    return () => {
      stopRecognition();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordStatus]);
};
