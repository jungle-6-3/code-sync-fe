import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCheckUserQuery from "@/hooks/Users/useCheckUserQuery";

interface UserGuardProps {
  children: ReactNode;
  fallBack?: ReactNode;
  whenError?: ReactNode;
}

export const UserLoginPageGuard = ({ children }: UserGuardProps) => {
  const navigate = useNavigate();
  const { checkUser, isError, isLoading } = useCheckUserQuery();

  useEffect(() => {
    if (isLoading) return;
    if (checkUser && checkUser.success) {
      navigate("/room/create");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkUser, isError]);

  return children;
};

export const UserGuard = ({ children }: UserGuardProps) => {
  const navigate = useNavigate();
  const { checkUser, isError, isLoading } = useCheckUserQuery();

  useEffect(() => {
    if (isLoading) return;
    if (isError || !checkUser) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkUser, isError]);

  return children;
};
