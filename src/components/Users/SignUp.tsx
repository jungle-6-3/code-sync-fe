import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import usePostData from "@/hooks/SignUp/useSignUpQuery";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import formSignUpSchema from "@/components/Users/SignUpSchema";
import { SignUpResponseUserDto } from "@/apis/users/dtos";

export default function SignUp() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSignUpSchema>>({
    resolver: zodResolver(formSignUpSchema),
    defaultValues: {
      username: "",
      useremail: "",
      userpassword: "",
    },
  });

  const { signup } = usePostData();

  const onSignUp = (data: z.infer<typeof formSignUpSchema>) => {
    signup.mutate(
      {
        name: data.username,
        email: data.useremail,
        password: data.userpassword,
      },
      {
        onSuccess: (response: SignUpResponseUserDto) => {
          console.log(response);
          navigate("/");
        },
        onError: (error: Error) => {
          console.error(error);
        },
      },
    );
  };

  return (
    <div className="absolute right-0 flex h-full min-w-[28rem] flex-col items-center justify-center rounded-lg bg-white p-8">
      <div className="">
        Already a member?
        <Link className="text-sky-700" to="/">
          Log In
        </Link>
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSignUp)} className="max-w-[200px]">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="홍길동" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                <FormLabel className="font-bold">password</FormLabel>
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
          <div className="flex w-full gap-3 px-5 py-5 [&>*]:flex-1">
            <Button
              variant={"destructive"}
              className="bg-blue-900 font-bold text-white hover:bg-blue-800"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
