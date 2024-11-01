import LoginPage from "@/pages/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import SignUpPage from "@/pages/SignUpPage";
import ConversationJunctionPage from "@/pages/conversation";
import CreateRoomPage from "@/pages/CreateRoomPage";
import PreviousRoom from "@/pages/PreviousRoom";
import { UserGuard, UserLoginPageGuard } from "@/hooks/Users/useCheckUserValid";
import RoomSavePage from "@/pages/RoomSavePage";

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
    path: "/:conversationId",
    element: (
      <UserGuard>
        <ConversationJunctionPage />
      </UserGuard>
    ),
  },
  {
    path: "/room",
    children: [
      {
        index: true,
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
        path: "/room/save",
        element: (
          <UserGuard>
            <RoomSavePage />
          </UserGuard>
        ),
      },
    ],
  },
]);
