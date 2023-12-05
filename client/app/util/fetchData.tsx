type RequestMethod = "get" | "post" | "put" | "delete";

export default function fetchData<T = any>(
  url: string,
  method: RequestMethod,
  body?: T,
  onSuccess?: (data?: any) => void
) {
  const doRequest = async () => {
    try {
      let foundErrors: { [x: string]: string };
      const response =
        method === "get" || method === "delete"
          ? await fetch(url, {
              method: method,
            })
          : await fetch(url, {
              method: method,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            });

      let data = await response.json();

      if (data.errors) {
        foundErrors = data.errors.reduce(
          (
            acc: { [x: string]: any },
            err: { field: string | number; message: any }
          ) => {
            acc[err.field] = err.message;
            return acc;
          },
          {}
        );
        return { data: null, errors: foundErrors };
      }

      if (onSuccess) {
        onSuccess(data);
      }
      console.log(data);
      return { data: data, errors: null };
    } catch (error: any) {
      console.log(error);
      return { data: null, error };
    }
  };
  return doRequest();
}
