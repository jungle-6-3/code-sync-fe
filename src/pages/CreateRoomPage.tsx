import { checkValidPullRequest } from "@/api/pr/pr";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const createRoomSchema = z.object({
  "gh-pr-link": z.string().url(),
});

const CreateRoomPage = () => {
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof createRoomSchema>>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      "gh-pr-link": "",
    },
  });

  const onSubmit = (value: z.infer<typeof createRoomSchema>) => {
    checkValidPullRequest(value["gh-pr-link"])
      .then((response) => {
        if (response.status === 200) navigate("/1");
      })
      .catch(() => {
        setIsError(true);
      });
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-gray-500">
        새로운 회의를 생성하고 싶으신가요?
      </h1>
      <Link to="#" className="underline-offset-3 text-gray-600 underline">
        사용법을 잘 모르겠어요.
      </Link>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center justify-center"
        >
          <FormField
            control={form.control}
            name="gh-pr-link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <FormLabel className="text-xs text-gray-400">
                    Github PR 주소
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="GitHub PR 링크" type="url" />
                  </FormControl>
                  {isError && (
                    <div className="">유효하지 않는 PR 주소입니다.</div>
                  )}
                </FormLabel>
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-gray-400">
            새 회의 생성하기
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateRoomPage;
