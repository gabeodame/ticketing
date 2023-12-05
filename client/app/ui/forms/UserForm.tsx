"use client";

import { addUser, signIn } from "@/app/actions/auth-actions";
import SubmitButton from "@/app/components/forms/SubmitButton";
import { UserData } from "@/app/util/types";
import { redirect } from "next/navigation";
import React from "react";
import { useFormState } from "react-dom";

const initialFormState = {
  errors: { email: [], password: [] },
  message: "",
  currentUser: null,
};

function UserForm({ action }: { action: any }) {
  const [state, dispatch] = useFormState(action, initialFormState);
  console.log("state from user form", state);

  if (!state.errors) {
    console.log("redirecting");
    redirect("/");
  }

  return (
    <div className="w-full ">
      <div className="max-w-lg mx-auto mt-8">
        <h1 className="text-2xl font-bold ">Sign In</h1>
      </div>
      <form className="max-w-lg flex gap-3 mx-auto mt-4" action={dispatch}>
        <div className="w-[95%] mx-auto flex flex-col gap-3">
          <div className="flex gap-1 flex-col">
            <label htmlFor="email">Enter Email Address</label>
            <input
              autoComplete="email"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm placeholder='Enter your email' type='text' name='search'"
              aria-describedby="email-error"
              // onChange={(e: ChangeEvent<HTMLInputElement>) => {
              //   return setFormState({
              //     ...formState,
              //     email: e.currentTarget.value,
              //   });
              // }}
            />
            {/* <div className="">
            {formErrors?.errors?.email &&
              state.errors.email.map((err: string) => (
                <FormErrors error={err} key={err} />
              ))}
          </div> */}
            {/* {<FormErrors errors={formErrors} field="email" />} */}
          </div>
          <div className="flex gap-1 flex-col">
            <label className="" htmlFor="password">
              Enter your password
            </label>
            <input
              autoComplete="new-password"
              id="password"
              name="password"
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm placeholder='Enter your email' type='text' name='search'"
              type="password"
              placeholder="Enter your password"
              aria-describedby="password-error"
              // onChange={(e: ChangeEvent<HTMLInputElement>) => {
              //   return setFormState({
              //     ...formState,
              //     password: e.currentTarget.value,
              //   });
              // }}
            />
            {/* <div className="">
            {state?.errors?.password &&
              state.errors.password.map((err: string) => (
                <FormErrors error={err} key={err} />
              ))}
          </div> */}
            {/* {<FormErrors errors={formErrors} field="password" />} */}
          </div>
          <div className="" aria-describedby="form-error">
            {/* {formErrors["undefined"] && (
            <FormErrors errors={formErrors} field="undefined" />
          )} */}
          </div>
          {/* <FormErrors errors={message: "Falled to "} /> */}
          <SubmitButton>Sign In</SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
