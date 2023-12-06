import axios, { AxiosResponse } from "axios";
import { useState } from "react";

type RequestMethod = "get" | "post" | "put" | "delete";

export default function useRequest<T = any>(
  url: string,
  method: RequestMethod,
  body?: T,
  onSuccess?: (data: any) => void
) {
  const [errors, setErrors] = useState<any>(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response =
        method === "get" || method === "delete"
          ? await axios[method](url)
          : await axios[method](url, body);
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (error: any) {
      console.log(error.response?.data.errors);
      const newErrors = error.response?.data.errors.reduce(
        (
          acc: { [x: string]: any },
          err: { field: string | number; message: any }
        ) => {
          acc[err.field] = err.message;
          return acc;
        },
        {}
      );
      setErrors(newErrors);
    }
  };

  return { doRequest, errors };
}
