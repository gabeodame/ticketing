"use client";
import axios from "axios";
import { ChangeEvent, FormEvent, Suspense, useState } from "react";
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
import UserForm from "@/app/ui/forms/UserForm";
import { UserData } from "@/app/util/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Signup() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserForm state="signup" />
    </Suspense>
  );
}
