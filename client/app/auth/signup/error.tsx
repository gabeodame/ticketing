"use client";

import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  console.log("from error boundry", error.name);
  return <p>something went wrong</p>;
}
