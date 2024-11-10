import { lazy } from 'react';

export const LoginPage = lazy(() => import("@/pages/LoginPage"));
export const SignUpPage = lazy(() => import("@/pages/SignUpPage"));
export const ConversationJunctionPage = lazy(() => import("@/pages/conversation"));
export const CreateRoomPage = lazy(() => import("@/pages/room/CreateRoomPage"));
export const PreviousRoom = lazy(() => import("@/pages/room/PreviousRoom"));
export const RoomSavePage = lazy(() => import("@/pages/room/RoomSavePage"));
export const HowToUsePage = lazy(() => import("@/pages/room/HowToUsePage"));