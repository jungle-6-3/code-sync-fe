import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SpinIcon } from "@/components/icons";
import { LogoutButton } from "@/components/Users/LogoutButton";
import { useConversationMutation } from "@/hooks/Conversation/useConversationMutation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { userMediaStore } from "@/stores/userMedia.store";
import { checkValidPullRequest } from "@/apis/pr/pr";
import { createRoomSchema } from "@/lib/schema";
import { extractGitHubPrDetails } from "@/lib/github";
import { useCommunicationStore } from "@/stores/communicationState.store";

const CreateRoomPage = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setIsCreator = userMediaStore((state) => state.setIsCreator);
  const { mutate: createRoom } = useConversationMutation();
  const onInit = useCommunicationStore((state) => state.onInit);

  const navigate = useNavigate();
  const form = useForm<z.infer<typeof createRoomSchema>>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      ghPrLink: "",
    },
  });

  useEffect(() => {
    onInit();
  }, [onInit]);

  const onSubmit = async (value: z.infer<typeof createRoomSchema>) => {
    const { owner, repo, prNumber } = extractGitHubPrDetails(value);
    setIsLoading(true);

    const result = await checkValidPullRequest({ owner, repo, prNumber })
      .then((response) => {
        if (response.status === 200) {
          setIsError(false);
        }
        return true;
      })
      .catch(() => {
        setIsError(true);
        return false;
      });

    if (!result) {
      setIsLoading(false);
      return;
    }

    createRoom(
      { githubPrUrl: value.ghPrLink },
      {
        onSuccess: ({ data: { roomUuid } }) => {
          setIsCreator(true);
          setIsLoading(false);
          navigate(`/${roomUuid}`);
        },
        onError: ({ message }) => {
          alert(message);
          setIsLoading(false);
        },
      },
    );
  };

  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden overflow-x-hidden">
      <div className="flex w-full max-w-[30rem] flex-col gap-8">
        <div className="absolute right-0 top-0 p-4">
          <LogoutButton />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-gray-500">
            새로운 회의를 생성하고 싶으신가요?
          </h1>
          <Link
            to="/room/howtouse"
            className="underline-offset-3 text-gray-600 underline"
          >
            사용법을 잘 모르겠어요.
          </Link>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-end gap-4"
          >
            <FormField
              control={form.control}
              name="ghPrLink"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="relative flex flex-col gap-2 font-normal text-gray-400">
                    Github PR 주소
                    <FormControl>
                      <Input
                        {...field}
                        type="url"
                        className={cn(
                          "w-full rounded-md px-4 py-5 text-lg font-normal text-black",
                          { "border border-red-500 text-red-500": isError },
                        )}
                      />
                    </FormControl>
                    {isError && (
                      <div className="absolute right-0 top-0 text-red-500">
                        유효하지 않는 PR 주소입니다.
                      </div>
                    )}
                  </FormLabel>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!form.formState.isValid} size="lg">
              {isLoading ? <SpinIcon /> : "새 회의 생성하기"}
            </Button>
          </form>
        </Form>
      </div>
      <Button className="absolute bottom-12 right-12" size="lg" asChild>
        <Link to="/room">이전 회의록 보기</Link>
      </Button>
    </div>
  );
};

export default CreateRoomPage;
