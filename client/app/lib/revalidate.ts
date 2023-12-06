"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export async function revalidate(revaliPath: string, redirectPath: string) {
  revalidatePath(revaliPath);
  redirect(redirectPath);
}
