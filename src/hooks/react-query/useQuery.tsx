import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const signUpFetch = ({
  username,
  useremail,
  userpw,
}: {
  username: string;
  useremail: string;
  userpw: string;
}) => {
  return axios.post("https://jsonplaceholder.typicode.com/posts", {
    username,
    useremail,
    userpw,
  });
};

const signInFetch = ({
  useremail,
  userpw,
}: {
  useremail: string;
  userpw: string;
}) => {
  return axios.post("https://jsonplaceholder.typicode.com/posts", {
    useremail,
    userpw,
  });
};

export default function usePostData() {
  const signup = useMutation({
    mutationFn: signUpFetch,
  });

  const signin = useMutation({
    mutationFn: signInFetch,
  });

  return {
    signin: signin,
    signup: signup,
  };
}
