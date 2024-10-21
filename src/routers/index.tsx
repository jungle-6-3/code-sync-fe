import ConversationPage from "@/pages/ConversationPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  { path: "/", element: <></> },
  {
    path: "/:conversationId",
    element: <ConversationPage />,
  },
]);