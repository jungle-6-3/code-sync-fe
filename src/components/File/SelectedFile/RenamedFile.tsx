import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export const RenamedFile = () => {
  return (
    <Alert className="w-10/12 p-5">
      <Terminal className="h-4 w-4" />
      <AlertTitle className="text-2xl">Renamed File</AlertTitle>
      <AlertDescription>File renamed without changes.</AlertDescription>
    </Alert>
  );
};
