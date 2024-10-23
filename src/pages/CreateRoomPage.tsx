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
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const createRoomSchema = z.object({
  "gh-pr-link": z.string().url(),
});

const CreateRoomPage = () => {
  const form = useForm<z.infer<typeof createRoomSchema>>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      "gh-pr-link": "",
    },
  });

  const onSubmit = (value: z.infer<typeof createRoomSchema>) => {};

  return (
    <div>
      <h1>새로운 회의를 생성하고 싶으신가요?</h1>
      <Link to="#">사용법을 잘 모르겠어요.</Link>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="gh-pr-link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <FormLabel>Github PR 주소</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="GitHub PR 링크" type="url" />
                  </FormControl>
                </FormLabel>
              </FormItem>
            )}
          />
          <Button type="submit">새 회의 생성하기</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateRoomPage;
