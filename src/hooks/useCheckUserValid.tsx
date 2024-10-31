import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCheckUserQuery from "@/hooks/useCheckUserQuery";

interface UserGuardProps {
  children: ReactNode;
}

export const UserLoginPageGuard = ({ children }: UserGuardProps) => {
  const navigate = useNavigate();
  const { checkUser } = useCheckUserQuery();

  useEffect(() => {
    if (checkUser && checkUser.success) {
      navigate("/room/create");
    }
  }, [checkUser]);

  return children;
};

export const UserGuard = ({ children }: UserGuardProps) => {
  const navigate = useNavigate();
  const { checkUser } = useCheckUserQuery();

  useEffect(() => {
    if (!checkUser) {
      navigate("/");
    }
  }, [checkUser]);

  return children;
};
