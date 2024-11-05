import LoginPage from "@/pages/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import SignUpPage from "@/pages/SignUpPage";
import ConversationJunctionPage from "@/pages/conversation";
import CreateRoomPage from "@/pages/room/CreateRoomPage";
import PreviousRoom from "@/pages/room/PreviousRoom";
import { UserGuard, UserLoginPageGuard } from "@/hooks/Users/useCheckUserValid";
import RoomSavePage from "@/pages/room/RoomSavePage";

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
    path: "/signup",
    element: (
      <UserLoginPageGuard>
        <SignUpPage />
      </UserLoginPageGuard>
    ),
  },
  {
    path: "/room",
    element: (
      <UserGuard>
        <PreviousRoom />
      </UserGuard>
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
    path: "/room/:postId",
    element: (
      <UserGuard>
        <RoomSavePage />
      </UserGuard>
    ),
  },
  {
    path: "/:conversationId",
    element: (
      <UserGuard>
        <ConversationJunctionPage />
      </UserGuard>
    ),
  },
]);
