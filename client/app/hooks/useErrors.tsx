import axios, { AxiosResponse } from "axios";
import { useState } from "react";

type ErrorProps = {
  message: string;
  field?: string;
};

export default function useErrors(data: ErrorProps[]) {
  const [errors, setErrors] = useState<any>(null);

  const renderError = () => {
    try {
      console.log(errors.errors);
    } catch (error: any) {
      const newErrors = error.response.data.errors.reduce(
        (
          acc: { [x: string]: any },
          err: { field: string | number; message: any }
        ) => {
          acc[err.field] = err.message;
          return acc;
        },
        {}
      );
      //   setErrors(newErrors);
    }
  };

  return { renderError };
}
