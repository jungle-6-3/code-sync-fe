import LoginPage from "@/pages/LoginPage";
import ConversationPage from "@/pages/ConversationPage";
import { createBrowserRouter } from "react-router-dom";
import SignUpPage from "@/pages/SignUpPage";

export const router = createBrowserRouter([
  {
    path: "/:conversationId",
    element: <ConversationPage />,
  },
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]);
