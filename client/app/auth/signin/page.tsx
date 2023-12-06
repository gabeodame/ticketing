import UserForm from "@/app/ui/forms/UserForm";
import React from "react";
import { signIn } from "@/app/actions/auth-actions";

type formValues = {
  email: string;
  password: string;
};

function SignInPage() {
  return <UserForm state="signin" />;
}

export default SignInPage;
