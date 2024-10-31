import { create } from "zustand";

interface UserMediaState {
  audio: boolean;
  video: boolean;
}

interface UserMediaStore {
  isUserMediaOn: UserMediaState;
  isShowWebcam: boolean;
  toggleShowSharedWebcam: () => void;
  mediaStream: MediaStream | null;
  startWebcam: (constraints: UserMediaState) => void;
  stopWebcam: (constraints: UserMediaState) => void;
  opponentsMediaStream: MediaStream[];
  addOpponentMediaStream: (mediaStream: MediaStream) => void;
  removeOpponentMediaStream: (mediaStream: MediaStream) => void;
}

// Create a store for user media (singleton)
export const userMediaStore = create<UserMediaStore>()((set, get) => ({
  isShowWebcam: false,
  toggleShowSharedWebcam: () =>
    set((state) => ({ isShowWebcam: !state.isShowWebcam })),
  isUserMediaOn: {
    audio: false,
    video: false,
  },
  mediaStream: null,
  startWebcam: async ({ audio, video }: UserMediaState) => {
    if (get().mediaStream) {
      get()
        .mediaStream?.getTracks()
        .forEach((track) => {
          if (
            (track.kind === "audio" && !audio) ||
            (track.kind === "video" && !video)
          ) {
            track.enabled = true;
          }
        });
      set({
        mediaStream: get().mediaStream,
        isUserMediaOn: { video, audio },
      });
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio,
        video,
      });
      set({
        mediaStream: stream,
        isUserMediaOn: { video, audio },
      });
    } catch (error) {
      alert("Error accessing webcam");
      console.error("Error accessing webcam", error);
    }
  },
  stopWebcam: ({ audio, video }: UserMediaState) => {
    if (get().mediaStream) {
      get()
        .mediaStream?.getTracks()
        .forEach((track) => {
          if (
            (track.kind === "audio" && !audio) ||
            (track.kind === "video" && !video)
          ) {
            track.enabled = false;
          }
        });
      set({
        mediaStream: !video ? null : get().mediaStream,
        isUserMediaOn: { video, audio },
      });
    }
  },
  opponentsMediaStream: [],
  addOpponentMediaStream: (mediaStream) => {
    let opponentsMediaStream = get().opponentsMediaStream;
    if (
      get().opponentsMediaStream.some((stream) => stream.id === mediaStream.id)
    )
      opponentsMediaStream = opponentsMediaStream.filter(
        (stream) => stream.id !== mediaStream.id,
      );
    set({
      opponentsMediaStream: [...opponentsMediaStream, mediaStream],
    });
  },
  removeOpponentMediaStream: (mediaStream) => {
    set((state) => ({
      opponentsMediaStream: state.opponentsMediaStream.filter(
        (stream) => stream.id !== mediaStream.id,
      ),
    }));
  },
}));
