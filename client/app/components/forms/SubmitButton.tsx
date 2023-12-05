"use client";

import React from "react";
import { useFormStatus } from "react-dom";

type Props = {
  children: React.ReactNode | undefined;
};

function SubmitButton({ children }: Props) {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-cyan-600 py-2 pt-3 rounded-md font-bold txt-lg text-gray-200 tracking-wide  hover:bg-cyan-500"
      type="submit"
      aria-disabled={pending}
    >
      {children}
    </button>
  );
}

export default SubmitButton;
