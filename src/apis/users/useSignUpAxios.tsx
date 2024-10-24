import https from "@/lib/https";
import { SignUpRequestUserDto, SignUpResponseUserDto } from "@/apis/users/dtos";

const postSignUp = async (data: SignUpRequestUserDto) => {
  const response = await https.post<SignUpResponseUserDto>("auth/signUp", data);
  return response.data;
};

export default postSignUp;
