"use server";

import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import fetchData from "../util/fetchData";
import axios, { AxiosResponse } from "axios";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export type State = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
  currentUser?: UserData | null;
};

type UserData = {
  email: string;
  id: string;
};

const createUserSchema = z.object({
  email: z.string().email({
    message: "You must enter a valid email address.",
  }),
  password: z
    .string()
    .min(4, {
      message: "Your password must be between 4 and 20 characters.",
    })
    .max(20, {
      message: "Your password must be between 4 and 20 characters.",
    }),
});

export async function addUser(prevState: State, formData: FormData) {
  try {
    const validatedValues = createUserSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedValues.success) {
      return {
        ...prevState,
        errors: validatedValues.error.flatten().fieldErrors,
        message: "Please fix the errors below. Failed to create invoice.",
      };
    }

    //fetch data
    const passedInfo = validatedValues.data;
    // console.log(JSON.stringify(data));
    let response;
    console.log(passedInfo);

    if (typeof window === "undefined") {
      // Server-side
      const headers = {
        "Content-Type": "application/json",
        Host: "ticketing.dev",
      };

      response = await axios.post(
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/signup",
        passedInfo,
        { headers: headers }
      );
    } else {
      // Client-side
      response = await axios.post("/api/users/signup", passedInfo);
    }

    console.log(response.data);
    return {
      ...prevState,
      status: response.status,
      currentUser: response.data,
    };
  } catch (error: any) {
    console.log(error.response?.data);
    return {
      ...prevState,
      status: error.response?.status,
      currentUser: null,
      message: error.response?.data.errors[0].message,
    };
  }
}

export async function getCurrentUser() {
  const session = cookies().get("session")?.value;

  console.log(session, "from getCurrentUser");
  const headers = {
    "Content-Type": "application/json",
    Host: "ticketing.dev",
    Cookie: `session=${session}`,
  };

  if (typeof window === "undefined") {
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: headers,
      }
    );
    console.log(data);
    return data;
  }
  {
    const { data } = await axios.get("/api/users/currentuser");
    console.log(data);
    return data;
  }
}
