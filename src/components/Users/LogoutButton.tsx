import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/hooks/Users/useLogOutMutation";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const { mutate: logout } = useLogoutMutation();
  const navigate = useNavigate();

  const onLogout = async () => {
    logout(undefined, {
      onSuccess: () => {
        alert("로그아웃 되었습니다.");
        navigate("/");
      },
      onError: (error) => {
        console.error("logout오류", error);
      },
    });
  };
  return (
    <Button onClick={onLogout} variant="ghost">
      로그아웃
    </Button>
  );
};
