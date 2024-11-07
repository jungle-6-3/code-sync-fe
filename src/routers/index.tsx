import LoginPage from "@/pages/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import SignUpPage from "@/pages/SignUpPage";
import ConversationJunctionPage from "@/pages/conversation";
import CreateRoomPage from "@/pages/room/CreateRoomPage";
import PreviousRoom from "@/pages/room/PreviousRoom";
import { UserGuard, UserLoginPageGuard } from "@/hooks/Users/useCheckUserValid";
import RoomSavePage from "@/pages/room/RoomSavePage";
<<<<<<< HEAD
import PostDetailPage from "@/pages/room/RoomDetailPage";
import HowToUsePage from "@/pages/room/HowToUsePage";
=======
>>>>>>> d99f470f602bcf55f52e3b2ee4d6ab221f38c25b

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
<<<<<<< HEAD
    path: "/room/howtouse",
    element: (
      <UserGuard>
        <HowToUsePage />
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
  {
=======
>>>>>>> d99f470f602bcf55f52e3b2ee4d6ab221f38c25b
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
