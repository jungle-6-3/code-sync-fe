import LoginPage from "@/pages/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import SignUpPage from "@/pages/SignUpPage";
import ConversationJunctionPage from "@/pages/conversation";
import CreateRoomPage from "@/pages/CreateRoomPage";
import PreviousRoom from "@/pages/PreviousRoom";
import { UserGuard, UserLoginPageGuard } from "@/hooks/Users/useCheckUserValid";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserLoginPageGuard>
        <LoginPage />
      </UserLoginPageGuard>
    ),
  },
  {
    path: "/room/create",
    element: (
      <UserGuard>
        <CreateRoomPage />
      </UserGuard>
    ),
  },
  {
    path: "/signup",
    element: (
      <UserLoginPageGuard>
        <SignUpPage />
      </UserLoginPageGuard>
    ),
  },
  {
    path: "/:conversationId",
    element: <ConversationJunctionPage />,
  },
  {
    path: "/room",
    element: (
      // <UserGuard>
      <PreviousRoom />
      // </UserGuard>
    ),
  },
]);
