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
    <div className="overflow-auto p-4">
      <h3 className="font-medium">
        Commit Information
        <span className="mt-2 pl-2 text-sm text-gray-600 underline">
          Branch: {prInfo.requireUserInfo.branchName} →{" "}
          {prInfo.requestUserInfo.branchName}
        </span>
      </h3>
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
              <AccordionTrigger className="py-1">{file}</AccordionTrigger>
              {findList.map((comment) => (
                <CommentViewer comments={comment.comments} />
              ))}
            </AccordionItem>
          </Accordion>
        );
      })}
    </div>
  );
};

interface CommentViewerProps {
  comments: PrCommentInfo[];
}

const CommentViewer = ({ comments }: CommentViewerProps) => {
  const setSelectedCommitFile = fileSysyemStore(
    (state) => state.setSelectedCommitFile,
  );
  const commitFileList = fileSysyemStore((state) => state.commitFileList);

  const navigateCodeEditor = (filePath: string) => {
    const findSelecetedFile = commitFileList.find(
      (file) => file.filename === filePath,
    )!;
    setSelectedCommitFile(findSelecetedFile);
  };

  const firstComment = comments[0];
  const restComments = comments.slice(1);

  return (
    <AccordionContent className="pt-0">
      <div
        className="flex items-start gap-3 border-b border-gray-400 p-2"
        onClick={() => {
          navigateCodeEditor(firstComment.filepath);
        }}
      >
        <img
          src={firstComment.user.avatar_url}
          alt=""
          className="h-6 w-6 rounded-full"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center">
            <div className="text-sm font-medium">{firstComment.user.login}</div>
            <div className="pl-2 text-xs text-gray-500">
              {unixtimeConvertorToKorean(
                new Date(firstComment.date.created_at),
              )}
            </div>
          </div>
          <div className="mt-1 text-sm text-gray-600">
            {firstComment.body}
            <span className="pl-1 text-gray-500">
              [Ln {firstComment.original_line}]
            </span>
          </div>
        </div>
      </div>
      {restComments.length > 0 && (
        <Accordion type="single" collapsible>
          <AccordionItem value="replies" className="border-none">
            <AccordionTrigger className="py-2 pl-11 text-sm text-gray-500 hover:no-underline">
              {restComments.length}개의 답글
            </AccordionTrigger>
            <AccordionContent className="pb-2 pl-11 pt-0">
              {restComments.map((comment, index) => (
                <div
                  key={index}
                  className="mt-3 flex items-start gap-3 first:mt-0"
                >
                  <img
                    src={comment.user.avatar_url}
                    alt=""
                    className="h-6 w-6 rounded-full"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center">
                      <div className="text-sm font-medium">
                        {comment.user.login}
                      </div>
                      <span className="pl-2 text-xs text-gray-500">
                        {unixtimeConvertorToKorean(
                          new Date(comment.date.created_at),
                        )}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      {comment.body}
                      <span className="text-gray-500">
                        [Ln {comment.original_line}]
                      </span>
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
