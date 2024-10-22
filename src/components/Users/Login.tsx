import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useLoginQuery from "@/hooks/Login/useLoginQuery";
import { Terminal } from "lucide-react";
import { ChangeEvent, useState, MouseEvent } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPw, setUserPw] = useState("");

  const [loginValid, setLoginValid] = useState(true);

  // const [notAllow, setNotAllow] = useState(true);

  const onEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const onPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPw(e.target.value);
  };

  const { signin } = useLoginQuery();

  const onSignIn = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signin.mutate(
      {
        email: userEmail,
        password: userPw,
      },
      {
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (error) => {
          setLoginValid(false);
          console.error("Login error:", error);
        },
      },
    );
  };

  return (
    <div className="absolute right-0 flex h-full min-w-[28rem] flex-col items-center justify-center rounded-lg bg-white p-8">
      <form className="max-w-[200px]">
        <div>
          <div className = "py-5">
            {!loginValid && (
              <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>이메일 또는 비밀번호가 틀렸습니다.</AlertDescription>
              </Alert>
            )}
          </div>
          <label htmlFor="useremail">
            Email
            <Input
              id="useremail"
              type="text"
              value={userEmail}
              onChange={onEmail}
              placeholder="jungle@gmail.com"
            />
          </label>
        </div>
        <div>
          <label htmlFor="userpassword">
            Password
            <Input
              id="userpassword"
              value={userPw}
              onChange={onPassword}
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              type="password"
            />
          </label>
        </div>
        <div className="flex w-full gap-3 p-5 [&>*]:flex-1">
          <Button
            type="submit"
            className="bg-blue-900 text-white hover:bg-blue-800"
            variant={"destructive"}
            onClick={onSignIn}
          >
            로그인
          </Button>
        </div>
        <Link to="/signup">
          <div className="flex w-full gap-3 px-5 [&>*]:flex-1">
            <Button
              className="bg-blue-900 text-white hover:bg-blue-800"
              variant={"destructive"}
            >
              회원가입
            </Button>
          </div>
        </Link>
      </form>
    </div>
  );
}
