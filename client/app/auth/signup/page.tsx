"use client";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { RequestError } from "@/app/types";
import useRequest from "@/app/hooks/use-request";
// import Router from "next/router";
import SubmitButton from "@/app/components/forms/SubmitButton";
import fetchData from "@/app/util/fetchData";
import useErrors from "@/app/hooks/useErrors";
import FormErrors from "@/app/components/forms/FormErrors";
import { useRouter } from "next/navigation";
import { addUser } from "@/app/actions/auth-actions";
import { useFormState } from "react-dom";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function Signup() {
  const initialFormState = {
    errors: { email: [], password: [] },
    message: "",
    currentUser: null,
  };

  const [state, dispatch] = useFormState(addUser, initialFormState);
  const router = useRouter();

  const [formErrors, setFormErrors] = useState<{ [x: string]: string }>({});
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  if (state.currentUser) {
    console.log("redirecting");

    redirect("/");
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const data = await fetchData("/api/users/signup", "post", {
      email,
      password,
    });
    console.log(data.errors);
    if (data.errors) {
      setFormErrors(data.errors);
      // dispatch({ type: "SET_ERRORS", payload: data.errors });
    }
    console.log(data);
    if (data) {
      // dispatch({ type: "SET_CURRENT_USER", payload: data.data.currentUser });
      router.push("/");
    }
  };
  console.log(formErrors["password"]);

  return (
    <form className="max-w-lg flex gap-3 mx-auto mt-8" onSubmit={onSubmit}>
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              return setFormState({
                ...formState,
                email: e.currentTarget.value,
              });
            }}
          />
          {/* <div className="">
            {formErrors?.errors?.email &&
              state.errors.email.map((err: string) => (
                <FormErrors error={err} key={err} />
              ))}
          </div> */}
          {<FormErrors errors={formErrors} field="email" />}
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              return setFormState({
                ...formState,
                password: e.currentTarget.value,
              });
            }}
          />
          {/* <div className="">
            {state?.errors?.password &&
              state.errors.password.map((err: string) => (
                <FormErrors error={err} key={err} />
              ))}
          </div> */}
          {<FormErrors errors={formErrors} field="password" />}
        </div>
        <div className="" aria-describedby="form-error">
          {formErrors["undefined"] && (
            <FormErrors errors={formErrors} field="undefined" />
          )}
        </div>
        {/* <FormErrors errors={message: "Falled to "} /> */}
        <SubmitButton>Sign Up</SubmitButton>
      </div>
    </form>
  );
}
