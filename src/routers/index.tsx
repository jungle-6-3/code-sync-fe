import { createBrowserRouter } from "react-router-dom";

import { UserGuard, UserLoginPageGuard } from "@/hooks/Users/useCheckUserValid";
import {
  LoginPage,
  SignUpPage,
  HowToUsePage,
  PreviousRoom,
  RoomSavePage,
  CreateRoomPage,
  ConversationJunctionPage,
  RoomSharePage,
} from "@/routers/lazyComponents";
import { Suspense } from "react";

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
    path: "/room/howtouse",
    element: (
      <UserGuard>
        <HowToUsePage />
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
  {
    path: "/s/:shareId",
    element: (
      <Suspense>
        <RoomSharePage />
      </Suspense>
    ),
  },
]);
