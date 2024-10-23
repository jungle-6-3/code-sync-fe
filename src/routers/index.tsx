import LoginPage from "@/pages/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import SignUp from "@/components/Users/SignUp";
import ConversationJunctionPage from "@/pages/conversation";

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
    path: "/signup",
    element: <SignUp />,
  },
]);
