import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import usePostData from "@/hooks/useQuery";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPw, setUserPw] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);

  const [notAllow, setNotAllow] = useState(true);

  const onEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    setEmailValid(regex.test(userEmail));
  };

  const onPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?~-])[A-Za-z\d!@#$%^&*()_+\[\]{};':"\\|,.<>\/?~-]{8,}$/;
    if (regex.test(userPw)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  useEffect(() => {
    if (emailValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid]);

  const { signin } = usePostData();

  const onSignIn = async (e) => {
    e.preventDefault();
    signin.mutate({
      useremail: userEmail,
      userpw: userPw,
    });
    console.log(signin.variables);
  };

  return (
    <div className="flex h-full w-[300px] min-w-[28rem]  flex-col items-center justify-center rounded-lg bg-white p-8">
      <form className="max-w-[200px]">
        <div>
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
        <div className="text-rose-700 text-xs">
          {!emailValid && userEmail.length > 0 && (
            <div>올바른 이메일을 입력해주세요.</div>
          )}
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
        <div className="text-rose-700 text-xs">
          {!pwValid && userPw.length > 0 && (
            <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
          )}
        </div>
        <div className="flex w-full gap-3 [&>*]:flex-1 p-5">
          <Button
            type="submit"
            className="bg-blue-900 text-white hover:bg-blue-800"
            variant={"destructive"}
            disabled={notAllow}
            onClick={onSignIn}
          >
            로그인
          </Button>
        </div>
        <Link to="/signup">
          <div className="flex w-full gap-3 [&>*]:flex-1 px-5">
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
