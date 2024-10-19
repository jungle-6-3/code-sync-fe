import { useState } from "react";
import axios from "axios";

export default function usePostLoginAxios(url: string) {
  const [data, setData] = useState();
  const [error, setError] = useState();

  const postData = async (postData: any) => {
    try {
      const response = await axios.post(url, postData);
      setData(response.data);
    } catch (err) {
      setError(err);
    }
  };

  return { data, error, postData };
}
