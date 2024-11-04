import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import formLoginSchema from "@/lib/schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Terminal } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import useLoginMutation from "@/hooks/Users/useLoginMutation";

export default function Login() {
  const [loginValid, setLoginValid] = useState(true);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      useremail: "",
      userpassword: "",
    },
  });
  const { signin } = useLoginMutation();

  const onSignIn = async (data: z.infer<typeof formLoginSchema>) => {
    signin.mutate(
      {
        email: data.useremail,
        password: data.userpassword,
      },
      {
        onSuccess: () => {
          navigate("/room/create");
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
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSignIn)} className="max-w-[200px]">
          <FormField
            control={form.control}
            name="useremail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="jungle@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="영문, 숫자, 특수문자 포함 8자 이상 입력해주세요."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="py-5">
            {!loginValid && (
              <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="text-">
                  이메일 또는 비밀번호가 틀렸습니다.
                </AlertDescription>
              </Alert>
            )}
          </div>
          <div className="flex w-full gap-3 px-5 py-3 [&>*]:flex-1">
            <Button
              type="submit"
              className="bg-blue-900 font-bold text-white hover:bg-blue-800"
              variant={"destructive"}
            >
              로그인
            </Button>
          </div>
          <Link to="/signup">
            <div className="flex w-full gap-3 px-5 [&>*]:flex-1">
              <Button
                className="bg-blue-900 font-bold text-white hover:bg-blue-800"
                variant={"destructive"}
              >
                회원가입
              </Button>
            </div>
          </Link>
        </form>
      </FormProvider>
    </div>
  );
}
