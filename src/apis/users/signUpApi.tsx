import https from "@/lib/https";
import {
  PostSignUpRequestUserDto,
  PostSignUpResponseUserDto,
} from "@/apis/users/dtos";

const postSignUp = async (data: PostSignUpRequestUserDto) => {
  const response = await https.post<PostSignUpResponseUserDto>(
    "auth/signUp",
    data,
  );
  return response.data;
};

export default postSignUp;
