"use server";

import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import fetchData from "../util/fetchData";
import axios, { AxiosResponse } from "axios";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { buildClient } from "@/api/build-client";
import { State, UserData } from "../util/types";
import { createUserSchema } from "../lib/schema";

export async function signIn(prevState: State, formData: FormData) {
  const session = cookies().get("session")?.value;
  const headers = {
    // "Content-Type": "application/json",
    Host: "ticketing.dev",
    Cookie: `session=${session}`,
  };
  try {
    const validatedValues = createUserSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedValues.success) {
      return {
        ...prevState,
        errors: validatedValues.error.flatten().fieldErrors,
        message: "Please fix the errors below. Failed to sign in.",
      };
    }

    //fetch data
    const passedInfo = validatedValues.data;

    const client = buildClient({ headers });
    const { data } = await client.post("/api/users/signin", passedInfo);
    console.log("data from buildclient", data);
    if (data.id) {
      redirect("/");
    }
    revalidatePath("/");
    const dataToReturn = {
      ...prevState,
      errrors: null,
      status: 200,
      message: "You have successfully signed in. Redirecting to home page...",
      currentUser: data,
    };
    console.log("dataToReturn", dataToReturn);
    return dataToReturn;
  } catch (error: any) {
    revalidatePath("/auth/signin");
    return {
      ...prevState,
      errors: error.response?.data,
      currentUser: null,
      message: error.response?.data.errors[0].message,
    };
  }
}

export async function addUser(prevState: State, formData: FormData) {
  try {
    const validatedValues = createUserSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedValues.success) {
      return {
        ...prevState,
        status: 400,
        errors: validatedValues.error.flatten().fieldErrors,
        message: "Please fix the errors below. Failed to add user.",
        userData: null,
      };
    }

    //fetch data
    const passedInfo = validatedValues.data;

    return {
      ...prevState,
      errors: null,
      status: 200,
      message: "You have successfully created an invoice.",
      userData: passedInfo,
    };

    // const client = buildClient({ headers });
    // const res = await client.post("/api/users/signup", passedInfo, {
    //   withCredentials: true,
    // });

    // revalidatePath("/");
    // return res.data;
    // console.log(JSON.stringify(data));
    // let response;
    // console.log(passedInfo);

    // if (typeof window === "undefined") {
    //   // Server-side
    //   const headers = {
    //     "Content-Type": "application/json",
    //     Host: "ticketing.dev",
    //   };

    //   response = await axios.post(
    //     "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/signup",
    //     passedInfo,
    //     { headers: headers }
    //   );
    // } else {
    //   // Client-side
    //   response = await axios.post("/api/users/signup", passedInfo);
    // }

    // console.log(response.data);
    // return {
    //   ...prevState,
    //   status: response.status,
    //   currentUser: response.data,
    // };
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
  const headers = {
    // "Content-Type": "application/json",
    Host: "ticketing.dev",
    Cookie: `session=${session}`,
  };
  const client = buildClient({ headers });
  const { data } = await client.get("/api/users/currentuser");
  console.log("data from buildclient currentUser", data);
  revalidatePath("/");
  return data;
}

type Inputs = z.infer<typeof createUserSchema>;

export async function addUserAction(formData: Inputs) {
  const session = cookies().get("session")?.value;
  const headers = {
    // "Content-Type": "application/json",
    Host: "ticketing.dev",
    Cookie: `session=${session}`,
  };

  const validatedValues = createUserSchema.safeParse({
    email: formData.email,
    password: formData.password,
  });

  if (!validatedValues.success) {
    return {
      status: 400,
      errors: validatedValues.error.flatten().fieldErrors,
      //  message: "Please fix the errors below. Failed to add user.",
      userData: null,
    };
  }

  //fetch data
  const passedInfo = validatedValues.data;

  const dataObj = {
    errors: null,
    status: 200,
    //  message: "You have successfully created an invoice.",
    userData: passedInfo,
  };

  return dataObj;
}
