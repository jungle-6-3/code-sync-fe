import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
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
import { formSignUpSchema } from "@/lib/schema";
import useSignUpMutation from "@/hooks/Users/useSignUpMutation";

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

  const { mutate: signup } = useSignUpMutation();

  const onSignUp = (data: z.infer<typeof formSignUpSchema>) => {
    signup(
      {
        name: data.username,
        email: data.useremail,
        password: data.userpassword,
      },
      {
        onSuccess: () => {
          navigate("/");
        },
        onError: (error: Error) => {
          console.error(error);
        },
      },
    );
  };

  return (
    <div className="flex h-full min-w-[28rem] flex-col items-center justify-center rounded-lg bg-white p-8">
      <h1 className="my-8 text-3xl">Sign Up</h1>
      <div className="my-4 text-gray-600">
        Already a member? &nbsp;
        <Link className="font-light text-sky-600" to="/">
          Log In
        </Link>
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSignUp)}
          className="flex w-full max-w-[20rem] flex-col gap-4 capitalize"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
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
                <FormLabel>email</FormLabel>
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
                <FormLabel>password</FormLabel>
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
          <Button className="mx-8 my-4" type="submit">
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
