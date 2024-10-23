import { z } from "zod";

const formLoginSchema = z.object({
  useremail: z.string().email({ message: "존재할 수 없는 이메일" }),
  userpassword: z
    .string()
    .min(8, { message: "8글자 이상 적어주세요." })
    .regex(/[a-zA-Z]/, { message: "최소 1개의 영어를 포함해주세요" })
    .regex(/\d/, { message: "최소 1개의 숫자를 포함해주세요." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "최소 1개의 특수 문자를 포함해주세요.",
    }),
});

export default formLoginSchema;