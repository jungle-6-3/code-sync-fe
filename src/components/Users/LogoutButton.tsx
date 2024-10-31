import { useLogOutMutation } from "@/hooks/Users/useLogOutMutation";
import { Button } from "@/components/ui/button";

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
    <Button onClick={onLogOut} variant="ghost">
      로그아웃
    </Button>
  );
};
