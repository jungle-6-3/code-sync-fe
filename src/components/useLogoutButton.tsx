import { Button } from "@/components/ui/button";
import { useLogOutMutation } from "@/hooks/useLogOutMutation";

export const LogoutButton = () => {
  const logOut = useLogOutMutation();

  const onLogOut = async () => {
    logOut.mutate(undefined, {
      onSuccess: () => {
        alert("로그아웃 되었습니다.");
        location.reload();
      },
      onError: (error) => {
        console.error("logout오류", error);
      },
    });
  };
  return (
    <Button onClick={onLogOut} className="hover:bg-gray-800 bg-black text-white">
      로그아웃
    </Button>
  );
};
