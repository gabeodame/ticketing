import axios from "axios";
import { cookies } from "next/headers";

type Headers = {
  headers?: {
    Host: string;
    Cookie: string;
  };
};

export const buildClient = ({ headers }: Headers) => {
  if (typeof window === "undefined") {
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: {
        ...headers,
        "Content-Type": "application/json",
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
