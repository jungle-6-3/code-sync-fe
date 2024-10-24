import LoginPage from "@/pages/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import SignUpPage from "@/pages/SignUpPage";
import ConversationJunctionPage from "@/pages/conversation";
import CreateRoomPage from "@/pages/CreateRoomPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/room/create",
    element: <CreateRoomPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/:conversationId",
    element: <ConversationJunctionPage />,
  },
]);
