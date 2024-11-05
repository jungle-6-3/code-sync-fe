import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ConversationSaveTabs = () => {
  return (
    <Tabs defaultValue="note" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="note">Note</TabsTrigger>
        <TabsTrigger value="drawBoard">DrawBoard</TabsTrigger>
      </TabsList>
      <TabsContent value="note">Make changes to your note here.</TabsContent>
      <TabsContent value="drawBoard">Change your drawBoard here.</TabsContent>
    </Tabs>
  );
};

export default ConversationSaveTabs;
