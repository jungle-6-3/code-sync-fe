interface PreviewChatting {
  user: {
    message: string;
  };
}

export const PreviewChatting = ({ user }: PreviewChatting) => {
  return <div>{user.message}</div>;
};
