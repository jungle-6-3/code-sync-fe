import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useLoginQuery from "@/hooks/Users/useLoginMutation";
import { formLoginSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

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
  const { signin } = useLoginQuery();

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
    <div className="flex h-full min-w-[28rem] flex-col items-center justify-center rounded-lg bg-white p-8">
      <h1 className="my-8 text-3xl">Login</h1>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSignIn)}
          className="flex w-full max-w-[20rem] flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="useremail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
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
                <FormLabel>Password</FormLabel>
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
          <div className="h-6 text-center text-red-500">
            {!loginValid && "이메일 또는 비밀번호가 틀렸습니다."}
          </div>
          <div className="flex flex-col gap-4 px-8">
            <Button type="submit" variant="ghost">
              로그인
            </Button>
            <Button asChild>
              <Link to="/signup">회원가입</Link>
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
