import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/hooks/Users/useLogoutMutation";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const logout = useLogoutMutation();
  const navigate = useNavigate();

  const onLogout = async () => {
    logout.mutate(undefined, {
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
