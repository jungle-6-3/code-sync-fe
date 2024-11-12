import { RefObject } from "react";
import { toPng } from "html-to-image";
import { fileSysyemStore } from "@/stores/github.store";
import { drawBoardStore } from "@/stores/drawBoard.store";
import { ADDITIONAL_FILES } from "@/constant/github";

interface Size {
  width: number;
  height: number;
}

interface UseConvertToImageProps {
  elementRef: RefObject<HTMLDivElement>;
  size: Size;
}

export const useConvertToImage = ({
  elementRef,
  size,
}: UseConvertToImageProps) => {
  const setIsImageAddedInfo = drawBoardStore(
    (state) => state.setIsAddedImageInfo,
  );
  const setSelectedCommitFile = fileSysyemStore(
    (state) => state.setSelectedCommitFile,
  );

  const convertToImage = () => {
    if (!elementRef.current) return;
    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl: string) => {
        sessionStorage.setItem("image", dataUrl);
        setIsImageAddedInfo({
          added: true,
          size: {
            width: size.width,
            height: size.height,
          },
        });
        setSelectedCommitFile(ADDITIONAL_FILES.MainDrawBoard);
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  };

  return { convertToImage };
};
