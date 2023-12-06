import axios from "axios";
import { cookies } from "next/headers";

type Headers = {
  headers?: {
    Host: string;
    Cookie?: string;
  };
};

export const buildClient = ({ headers }: Headers) => {
  if (typeof window === "undefined") {
    // we are on the server
    const session = cookies().get("session")?.value;
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      withCredentials: true,
      headers: {
        ...headers,
        "Content-Type": "application/json",
        "set-cookie": `session=${session}`,
      },
    });
  } else {
    // we are on the browser
    // requests can be made with a base url of ''
    return axios.create({
      baseURL: "/",
    });
  }
};
