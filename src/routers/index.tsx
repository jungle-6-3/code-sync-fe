import { createBrowserRouter } from "react-router-dom";
import { UserGuard, UserLoginPageGuard } from "@/hooks/useCheckUserValid";
import LoginPage from "@/pages/LoginPage";
import SignUpPage from "@/pages/SignUpPage";
import CreateRoomPage from "@/pages/CreateRoomPage";
import PreviousMeeting from "@/pages/PreviousMeeting";
import ConversationJunctionPage from "@/pages/conversation";
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
            <PreviousMeeting />
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
