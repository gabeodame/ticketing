import { getCurrentUser } from "./actions/auth-actions";

export default async function Home() {
  const currentUser: {
    currentUser: { email: string; id: string; password: string };
  } = await getCurrentUser();

  console.log("currentUser from home", currentUser?.currentUser?.email);

  return (
    <main className="p-3 bg-gray-200 text-black">
      <p className="text-2xl">
        {currentUser.currentUser
          ? currentUser.currentUser?.email
          : "You are not signed in"}
      </p>
    </main>
  );
}
