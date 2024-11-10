import { create } from "@/lib/zustand";

interface UserMediaState {
  audio: boolean;
  video: boolean;
}

interface UserMediaStore {
  isCreator: boolean;
  setIsCreator: (isCreator: boolean) => void;
  isUserMediaOn: UserMediaState;
  isShowWebcam: boolean;
  toggleShowSharedWebcam: () => void;
  mediaStream: MediaStream | null;
  startWebcam: (constraints: UserMediaState) => void;
  stopWebcam: (constraints: UserMediaState) => void;
  removeWebcam: () => void;
  opponentsMediaStream: MediaStream[];
  addOpponentMediaStream: (mediaStream: MediaStream) => void;
  removeOpponentMediaStream: () => void;
}

// Create a store for user media (singleton)
export const userMediaStore = create<UserMediaStore>()((set, get) => ({
  isCreator: false,
  setIsCreator: (isCreator) => set({ isCreator }),
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
  removeWebcam: () => {
    get()
      .mediaStream?.getTracks()
      .forEach((track) => track.stop());
    set({ mediaStream: null, isUserMediaOn: { video: false, audio: false } });
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
  removeOpponentMediaStream: () => {
    set({ opponentsMediaStream: [] });
  },
}));
