import LoginPage from "@/pages/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import SignUp from "@/components/Users/SignUp";
import ConversationJunctionPage from "@/pages/conversation";
import CreateRoomPage from "@/pages/CreateRoomPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/:conversationId",
    element: <ConversationJunctionPage />,
  },
  {
    path: "/room/create",
    element: <CreateRoomPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);
