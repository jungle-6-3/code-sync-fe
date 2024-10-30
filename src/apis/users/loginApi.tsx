import { LoginRequestUserDto, LoginResponseUserDto } from "@/apis/users/dtos";
import https from "@/lib/https";

const postLogin = async (data: LoginRequestUserDto) => {
  const response = await https.post<LoginResponseUserDto>("auth/signin", data);
  return response.data;
};

export default postLogin;
