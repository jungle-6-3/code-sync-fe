import { checkValidPullRequest } from "@/apis/pr/pr";
import { SpinIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useConversationMutation } from "@/hooks/useConversationMutation";
import { extractGitHubPrDetails } from "@/lib/github";
import { cn } from "@/lib/utils";
import { fileSysyemStore, PrMetaDataInfo } from "@/stores/github.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const createRoomSchema = z.object({
  ghPrLink: z.string().url(),
});

const CreateRoomPage = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: createRoom } = useConversationMutation();

  const { setPrChangedFileList } = fileSysyemStore();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof createRoomSchema>>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      ghPrLink: "",
    },
  });

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

    if (result) {
      createRoom(
        { githubPrUrl: value.ghPrLink },
        {
          onSuccess: ({ data }) => {
            navigate(`/${data.redirectUrl}`);
            InitializePrData({ owner, prNumber: +prNumber, repo })
              .then(() => {
                setIsLoading(false);
              })
              .catch((e) => {
                alert(e);
                setIsLoading(false);
              });
          },
          onError: ({ message }) => {
            alert(message);
            setIsLoading(false);
          },
        },
      );
      return;
    }

    setIsLoading(false);
  };

  const InitializePrData = ({ owner, repo, prNumber }: PrMetaDataInfo) =>
    setPrChangedFileList({ owner, prNumber, repo }).catch((e) => alert(e));

  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden overflow-x-hidden">
      <div className="flex w-full max-w-[30rem] flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-gray-500">
            새로운 회의를 생성하고 싶으신가요?
          </h1>
          <Link to="#" className="underline-offset-3 text-gray-600 underline">
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
                  <FormLabel className="relative flex flex-col gap-2">
                    <FormLabel className="font-normal text-gray-400">
                      Github PR 주소
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="url"
                        className={cn(
                          "w-full rounded-md px-4 py-5 text-lg font-normal",
                          {
                            "border border-red-500": isError,
                          },
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
            <Button type="submit" className="bg-gray-400" size="lg">
              {isLoading ? <SpinIcon /> : "새 회의 생성하기"}
            </Button>
          </form>
        </Form>
      </div>
      <Button className="absolute bottom-12 right-12" size="lg" asChild>
        <Link to="#">이전 회의록 보기</Link>
      </Button>
    </div>
  );
};

export default CreateRoomPage;
