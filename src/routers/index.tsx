import LoginPage from "@/pages/LoginPage";
import ConversationPage from "@/pages/ConversationPage";
import { createBrowserRouter } from "react-router-dom";
import SignUp from "@/components/Users/SignUp";

export const router = createBrowserRouter([
  { path: "/", element: <></> },
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
    element: <SignUp />,
  },
]);
