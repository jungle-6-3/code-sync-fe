import {
  fileSysyemStore,
  PrCommentInfo,
  prInfoStore,
} from "@/stores/github.store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { unixtimeConvertorToKorean } from "@/lib/time";

export const PRBottomFileExplorer = () => {
  const { prInfo } = prInfoStore();
  const commentsList = fileSysyemStore((state) => state.commentsList);
  const [fileList, setFileList] = useState<Set<string>>(new Set());

  useEffect(() => {
    const newFileList = new Set<string>();
    commentsList.forEach((comment) => {
      newFileList.add(comment.filename);
    });
    setFileList(newFileList);
  }, [commentsList]);

  return (
    <div className="flex h-full flex-col overflow-hidden p-2">
      <h3 className="truncate font-medium">
        Commit Information
        <span className="mt-2 pl-2 text-sm text-gray-600 underline">
          Branch: {prInfo.requireUserInfo.branchName} →{" "}
          {prInfo.requestUserInfo.branchName}
        </span>
      </h3>
      <div className="flex-1 overflow-y-auto p-2">
        {Array.from(fileList).map((file, index) => {
          const findList = commentsList.filter(
            (commit) => commit.filename === file,
          );
          return (
            <Accordion
              key={`file-${index}`}
              type="single"
              collapsible
              className="w-full pt-0"
            >
              <AccordionItem value="item-1 border-t" className="border-none">
                <AccordionTrigger className="flex-row-reverse justify-end gap-2 p-0">
                  {file}
                </AccordionTrigger>
                {findList.map((comment, index) => (
                  <CommentViewer key={index} comments={comment.comments} />
                ))}
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

interface CommentViewerProps {
  comments: PrCommentInfo[];
}

const CommentViewer = ({ comments }: CommentViewerProps) => {
  const commitFileList = fileSysyemStore((state) => state.commitFileList);
  const setSelectedCommitFile = fileSysyemStore(
    (state) => state.setSelectedCommitFile,
  );
  const firstComment = comments[0];
  const restComments = comments.slice(1);

  const navigateCodeEditor = (filePath: string) => {
    const findSelecetedFile = commitFileList.find(
      (file) => file.filename === filePath,
    )!;
    if (findSelecetedFile) {
      setSelectedCommitFile(findSelecetedFile);
    } else {
      alert(
        "이 댓글은 파일의 이전 버전에 작성된 내용으로, 현재 파일에서는 열 수 없습니다. 최신 변경 사항과 함께 댓글을 확인해주세요.",
      );
      return;
    }
  };

  return (
    <AccordionContent className="py-0">
      <div
        className="flex items-start gap-3 pl-4 pt-2"
        onClick={() => {
          navigateCodeEditor(firstComment.filepath);
        }}
      >
        <img
          src={firstComment.user.avatar_url}
          alt=""
          loading="lazy"
          className="h-6 w-6 rounded-full"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center">
            <div className="text-nowrap text-sm font-medium">
              {firstComment.user.login}
            </div>
            <div className="text-nowrap pl-2 text-xs text-gray-500">
              {unixtimeConvertorToKorean(
                new Date(firstComment.date.created_at),
              )}
            </div>
            <div className="truncate pl-2 text-sm text-gray-600">
              {firstComment.body}
              <span className="pl-1 text-gray-500">
                [Ln {firstComment.original_line}]
              </span>
            </div>
          </div>
        </div>
      </div>
      {restComments.length > 0 && (
        <Accordion type="single" collapsible>
          <AccordionItem value="replies" className="group border-none">
            <AccordionTrigger className="group flex-row-reverse justify-end gap-2 border-none py-2 pl-11 text-sm text-gray-500">
              <span className="group-data-[state=open]:hidden">
                {restComments.length}개의 답글
              </span>
              <span className="hidden group-data-[state=open]:block">닫기</span>
            </AccordionTrigger>
            <AccordionContent className="pb-2 pl-11 pt-0">
              {restComments.map((comment) => (
                <div
                  key={comment.comment_id}
                  className="mt-3 flex items-start gap-3 first:mt-0"
                >
                  <img
                    src={comment.user.avatar_url}
                    alt=""
                    loading="lazy"
                    className="h-6 w-6 rounded-full"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center">
                      <div className="text-nowrap text-sm font-medium">
                        {comment.user.login}
                      </div>
                      <span className="text-nowrap pl-2 text-xs text-gray-500">
                        {unixtimeConvertorToKorean(
                          new Date(comment.date.created_at),
                        )}
                      </span>
                      <div className="truncate pl-2 text-sm text-gray-600">
                        {comment.body}
                        <span className="text-gray-500">
                          [Ln {comment.original_line}]
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </AccordionContent>
  );
};
