import { SocketManager } from "@/lib/socketManager";
import { useCommunicationStore } from "@/stores/communicationState.store";
import { useEffect, useRef } from "react";

export const useVoiceSave = (
  recordStatus: boolean,
  language: "ko-KR" | "en-US" = "ko-KR",
) => {
  const recognition = useRef(
    new (window.SpeechRecognition || window.webkitSpeechRecognition)(),
  ).current;

  const isSocketManagerReady = useCommunicationStore(
    (state) => state.isSocketManagerReady,
  );

  if (!isSocketManagerReady) throw new Error("socketManager is not ready");
  const socket = SocketManager.getInstance().socketIOSocket;

  recognition.lang = language;
  recognition.continuous = false;
  recognition.interimResults = false;

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
    isRecognizing.current = false;
    if (!recordStatus) {
      // recordStatus가 true가 아니면 다시 시작
      startRecognition();
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
      try {
        recognition.start();
        isRecognizing.current = true;
      } catch (error) {
        console.error("Failed to start recognition:", error);
      }
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
      stopRecognition();
    } else {
      startRecognition();
    }

    return () => {
      stopRecognition();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordStatus]);

  useEffect(() => {
    return () => {
      recognition.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
