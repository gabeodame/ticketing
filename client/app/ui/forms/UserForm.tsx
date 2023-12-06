"use client";

import { addUser, addUserAction, signIn } from "@/app/actions/auth-actions";
import SubmitButton from "@/app/components/forms/SubmitButton";
import { UserData } from "@/app/util/types";
import { redirect } from "next/navigation";

import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "@/app/lib/schema";
import FormErrors from "@/app/components/forms/FormErrors";
import { z } from "zod";
import { buildClient } from "@/api/build-client";
import fetchData from "@/app/util/fetchData";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { revalidate } from "@/app/lib/revalidate";

type Inputs = z.infer<typeof createUserSchema>;

type Props = {
  state?: "signin" | "signup";
};

function UserForm({ state }: Props) {
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (state === "signup") {
      setIsNewUser(true);
    }
  }, [state]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(createUserSchema),
  });

  const handleFormSubmit: SubmitHandler<Inputs> = async (data) => {
    const passedData = await addUserAction(data);
    console.log(passedData);

    if (passedData.errors) {
      console.log(passedData.errors);
      return;
    }

    const userData = await fetchData(
      state === "signin" ? "/api/users/signin" : "/api/users/signup",
      "post",
      passedData.userData
    );
    if (!userData.errors || userData.errors === null) {
      await revalidate("/", "/");
    }

    reset();
  };

  return (
    <div className="w-full ">
      <div className="max-w-lg mx-auto mt-8">
        <h1 className="text-2xl font-bold ">
          {isNewUser ? "Sign Up" : "Sign In"}
        </h1>
      </div>
      <form
        className="max-w-lg flex gap-3 mx-auto mt-4"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="w-[95%] mx-auto flex flex-col gap-3">
          <div className="flex gap-1 flex-col">
            <label htmlFor="email">Enter Email Address</label>
            <input
              autoComplete="email"
              id="email"
              // name="email"
              type="email"
              placeholder="Enter your email address"
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm placeholder='Enter your email' type='text' name='search'"
              aria-describedby="email-error"
              {...register("email")}

              // onChange={(e: ChangeEvent<HTMLInputElement>) => {
              //   return setFormState({
              //     ...formState,
              //     email: e.currentTarget.value,
              //   });
              // }}
            />
            {errors?.email?.message && (
              <div className="text-red-800 text-sm w-full bg-red-200 py-1 px-2">
                <p>{errors.email.message}</p>
              </div>
            )}
            {/* {<FormErrors errors={formErrors} field="email" />} */}
          </div>
          <div className="flex gap-1 flex-col">
            <label className="" htmlFor="password">
              Enter your password
            </label>
            <input
              autoComplete="new-password"
              id="password"
              // name="password"
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm placeholder='Enter your email' type='text' name='search'"
              type="password"
              placeholder="Enter your password"
              aria-describedby="password-error"
              {...register("password")}
            />
            {errors?.password?.message && (
              <div className="text-red-800 text-sm w-full bg-red-200 py-1 px-2">
                <p>{errors.password.message}</p>
              </div>
            )}

            {/* {<FormErrors errors={formErrors} field="password" />} */}
          </div>
          <div className="" aria-describedby="form-error">
            {/* {errors?.password?.message && (
              <div className="text-red-800 text-sm w-full bg-red-200 py-1 px-2">
                <p>{errors.message}</p>
              </div>
            )} */}
          </div>
          {/* <FormErrors errors={message: "Falled to "} /> */}
          <SubmitButton>{isNewUser ? "Sign Up" : "Sign In"}</SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
