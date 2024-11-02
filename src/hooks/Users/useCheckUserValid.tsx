import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCheckUserQuery from "@/hooks/useCheckUserQuery";
import { SpinIcon } from "@/components/icons";

interface UserGuardProps {
  children: ReactNode;
  fallBack?: ReactNode;
  whenError?: ReactNode;
}

export const UserLoginPageGuard = ({ children, fallBack }: UserGuardProps) => {
  const navigate = useNavigate();
  const { checkUser, isLoading } = useCheckUserQuery();

  useEffect(() => {
    if (isLoading) return;
    if (checkUser && checkUser.success) {
      navigate("/room/create");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isLoading) {
    return fallBack && <SpinIcon />;
  }

  return children;
};

export const UserGuard = ({ children, fallBack }: UserGuardProps) => {
  const navigate = useNavigate();
  const { checkUser, isError, isLoading } = useCheckUserQuery();

  useEffect(() => {
    if (isLoading) return;
    if (isError || !checkUser) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkUser, isError, isLoading]);

  if (isLoading) {
    return fallBack;
  }

  return children;
};