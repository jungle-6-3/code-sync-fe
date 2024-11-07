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
    <div className="p-4">
      <h3 className="font-medium">Commit Information</h3>
      <p className="mt-2 text-sm">
        Branch: {prInfo.requireUserInfo.branchName} →{" "}
        {prInfo.requestUserInfo.branchName}
      </p>
      {Array.from(fileList).map((file, index) => {
        const findList = commentsList.filter(
          (commit) => commit.filename === file,
        );
        return (
          <Accordion
            key={`file-${index}`}
            type="single"
            collapsible
            className="w-full"
          >
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="py-3 hover:no-underline">
                {file as string}
              </AccordionTrigger>
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

  useEffect(() => {
    console.log("", restComments);
  });

  return (
    <AccordionContent className="pt-0">
      <div
        className="flex items-start gap-3 border-b p-2"
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
          <div className="text-sm font-medium">{firstComment.user.login}</div>
          <div className="mt-1 text-sm text-gray-600">{firstComment.body}</div>
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
                    <div className="text-sm font-medium">
                      {comment.user.login}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      {comment.body}{" "}
                      <span className="text-gray-600">
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
