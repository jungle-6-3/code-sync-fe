interface User {
  name: string;
  message: string;
}

export interface PreviewChattingProps {
  user: User;
  onClick: () => void;
}
