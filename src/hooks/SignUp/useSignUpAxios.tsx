import https from "@/lib/https";

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

export default signUpFetch;