interface User {
  name: string;
  message: string;
}

export interface PreviewChattingProps {
  user: User;
  onClick: () => void;
}

export const PreviewChatting: React.FC<PreviewChattingProps> = ({
  user,
  onClick,
}) => {
  return (
    <div className="absolute mx-auto mb-4 flex w-full max-w-[90%] sm:max-w-[250px]">
      <div
        onClick={onClick}
        className="flex w-full cursor-pointer items-center rounded-md bg-gray-100 p-3 shadow-md transition-colors duration-200 hover:bg-gray-200"
      >
        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 font-bold text-black">
          {user.name[0]}
        </div>
        <div className="flex-1 text-sm text-gray-700">
          <p className="font-semibold text-gray-900">{user.name}</p>
          <p className="truncate">{user.message}</p>
        </div>
      </div>
    </div>
  );
};
