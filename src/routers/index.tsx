import LoginPage from "@/pages/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import SignUpPage from "@/pages/SignUpPage";
import ConversationJunctionPage from "@/pages/conversation";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
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
