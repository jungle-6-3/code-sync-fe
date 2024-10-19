import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPw, setUserPw] = useState("");

  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);

  const [notAllow, setNotAllow] = useState(true);

  const navigate = useNavigate();

  const onName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    const regex = /^[가-힣]{2,4}$/;
    if (regex.test(userName)) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

  const onEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (regex.test(userEmail)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const onPw = (e: ChangeEvent<HTMLInputElement>) => {
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
    if (nameValid && emailValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [nameValid, emailValid, pwValid]);

  const onAddUser = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "/auth/signup",
        {
          username: userName,
          useremail: userEmail,
          userpw: userPw,
        }
      );
      console.log("User added:", response.data);
      navigate("/");
    } catch (error) {
      console.log("Error adding user:", error);
    }
  };

  return (
    <div className="flex h-full w-[300px] min-w-[28rem]  flex-col items-center justify-center rounded-lg bg-white p-8">
      <form className="max-w-[200px]">
        <div>
          <label htmlFor="username">
            Name
            <Input
              id="username"
              type="text"
              value={userName}
              onChange={onName}
              placeholder="홍길동"
            />
          </label>
        </div>
        <div className="text-rose-700 text-xs">
          {!nameValid && userName.length > 0 && (
            <div>올바른 이름을 입력해주세요</div>
          )}
        </div>
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
              onChange={onPw}
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
        <div className="flex w-full gap-3 [&>*]:flex-1 px-5 py-5">
          <Button
            type="submit"
            variant={"destructive"}
            className="bg-blue-900 text-white hover:bg-blue-800"
            disabled={notAllow}
            onClick={onAddUser}
          >
            회원가입
          </Button>
        </div>
      </form>
    </div>
  );
}
