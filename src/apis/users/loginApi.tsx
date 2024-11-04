import {
  PostLoginRequestUserDto,
  PostLoginResponseUserDto,
} from "@/apis/users/dtos";
import https from "@/lib/https";

const postLogin = async (data: PostLoginRequestUserDto) => {
  const response = await https.post<PostLoginResponseUserDto>(
    "auth/signin",
    data,
  );
  return response.data;
};

export default postLogin;
