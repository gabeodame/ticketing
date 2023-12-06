"use client";

import useRequest from "@/app/hooks/use-request";
import { revalidate } from "@/app/lib/revalidate";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignOutPage() {
  const router = useRouter();
  const { doRequest, errors } = useRequest(
    "/api/users/signout",
    "post",
    {},

    () => revalidate("/", "/")
  );

  useEffect(() => {
    doRequest();
  });

  return <div>Signing you out...</div>;
}
