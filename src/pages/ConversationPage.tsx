import { getPrData, getPrCommitsData, getFileData } from "@/api/pr/pr";
import { CodeEditor, CodeSplitEditor } from "@/components/CodeEditor";
import { LeftGNB, TopGNB } from "@/components/GNB";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ChangedFile, GetPrDataParams, PrInfoProps } from "@/types/pr";
import { userInfo } from "os";
import { useEffect, useState } from "react";

const owner = "JNU-Parking-Ticket-Project";
const repo = "Parking-Ticket-FE";
const prNumber = 243;

function decodeByType(data: string, encodingType: string) {
  switch (encodingType.toLowerCase()) {
    case "base64":
      return Buffer.from(data, "base64").toString("utf-8");
    case "url":
    case "url-encoded":
      return decodeURIComponent(data);
    case "unicode":
    case "utf-8":
      return unescape(encodeURIComponent(data));
    case "json":
      return JSON.parse(data);
    default:
      throw new Error(`Unsupported encoding type: ${encodingType}`);
  }
}

const ConversationPage = () => {
  const [prInfo, setPrInfo] = useState<PrInfoProps>({
    requestBranch: "",
    receiveBranch: "",
    userId: "",
  });
  const [changedFiles, setChangedFiles] = useState<ChangedFile[]>([]);

  const fetchPrData = async () => {
    try {
      const response = await getPrData({
        owner,
        repo,
        prNumber,
      } as GetPrDataParams);
      setPrInfo({
        requestBranch: response.head.ref,
        receiveBranch: response.base.ref,
        userId: response.user.login,
      });
    } catch (error) {
      console.error("Error fetching PR data:", error);
    }
  };
  const fetchCommitsData = async () => {
    try {
      const response = await getPrCommitsData({ owner, repo, prNumber });
      const processedFiles = await Promise.all(
        response.map(async (commit) => {
          const beforeContent = await getFileContent(
            owner, // userId 대신 owner 사용
            repo,
            prInfo.receiveBranch,
            commit.filename,
          );
          return {
            filename: commit.filename,
            status: commit.status,
            additions: commit.additions,
            deletions: commit.deletions,
            raw_url: commit.raw_url,
            beforeContent,
          };
        }),
      );

      setChangedFiles(processedFiles);
    } catch (error) {
      console.error("Error fetching commits data:", error);
    }
  };

  const getFileContent = async (
    owner: string,
    repo: string,
    branchName: string,
    fileName: string,
  ) => {
    try {
      const response = await getFileData({
        owner,
        repo,
        branchName,
        fileName,
      });
      return response;
    } catch (error) {
      console.error(`Error fetching file content: ${error}`);
      return null;
    }
  };

  useEffect(() => {
    fetchPrData();
  }, []);

  useEffect(() => {
    if (prInfo.receiveBranch && prInfo.userId && prInfo.requestBranch) {
      fetchCommitsData();
    }
  }, [prInfo]);

  return (
    <div className="flex h-screen flex-col">
      <nav className="border-b p-1">
        <TopGNB />
      </nav>
      <div className="flex h-full">
        <nav className="border-r">
          <LeftGNB />
        </nav>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20}>
            <div className="p-4">
              <h2 className="text-lg font-semibold">Changed Files</h2>
              <ul className="mt-2">
                {changedFiles.map((file, index) => (
                  <li key={index} className="py-1 text-sm">
                    {file.filename}
                  </li>
                ))}
              </ul>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={80}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={70}>
                <CodeSplitEditor
                  originalValue="123123213"
                  modifiedValue="4543534634"
                />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={30}>
                <div className="p-4">
                  <h3 className="font-medium">Commit Information</h3>
                  <p className="mt-2 text-sm">
                    Branch: {prInfo.requestBranch} → {prInfo.receiveBranch}
                  </p>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="bg-blue-400 p-1">bottom status</div>
    </div>
  );
};

export default ConversationPage;
