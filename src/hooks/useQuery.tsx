import https from "@/lib/https";
import { useMutation } from "@tanstack/react-query";

const signUpFetch = ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  return https.post("auth/signUp", {
    name,
    email,
    password,
  });
};

const signInFetch = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return https.post("auth/signin", {
    email,
    password,
  });
};

export default function usePostData() {
  const signup = useMutation({
    mutationFn: signUpFetch,
  });

  const signin = useMutation({
    mutationFn: signInFetch,
  });

  return {
    signin: signin,
    signup: signup,
  };
}
