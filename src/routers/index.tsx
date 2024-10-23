import LoginPage from "@/pages/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import SignUp from "@/components/Users/SignUp";
import ConversationJunctionPage from "@/pages/conversation";
import CreateRoomPage from "@/pages/CreateRoomPage";

export const router = createBrowserRouter([
  { path: "/", element: <></> },
  {
    path: "/:conversationId",
    element: <ConversationJunctionPage />,
  },
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
    element: <SignUp />,
  },
]);
