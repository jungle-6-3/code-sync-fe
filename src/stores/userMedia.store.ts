import { create } from "zustand";

interface UserMediaState {
  audio: boolean;
  video: boolean;
}

interface UserMediaStore {
  isUserMediaOn: UserMediaState
  mediaStream: MediaStream | null;
  startWebcam: (constraints: UserMediaState) => void;
  stopWebcam: (constraints: UserMediaState) => void;
}

// Create a store for user media (singleton)
export const userMediaStore = create<UserMediaStore>()((set) => ({
  isUserMediaOn: {
    audio: false,
    video: false,
  },
  mediaStream: null,
  startWebcam: async ({ audio, video }: UserMediaState) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio, video });
      set({
        mediaStream: stream,
        isUserMediaOn: { video, audio }
      });
    } catch (error) {
      alert("Error accessing webcam");
      console.error("Error accessing webcam", error);
    }
  },
  stopWebcam: ({ audio, video }: UserMediaState) => {
    if (userMediaStore.getState().mediaStream) {
      userMediaStore.getState().mediaStream?.getTracks().forEach((track) => {
        if ((track.kind === "audio" && !audio) || (track.kind === "video" && !video)) {
          track.stop();
        }
      });
      set({
        mediaStream: !video ? null : userMediaStore.getState().mediaStream,
        isUserMediaOn: { video, audio }
      }
      );
    }
  }
}));
