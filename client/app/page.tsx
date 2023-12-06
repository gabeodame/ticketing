import { getCurrentUser } from "./actions/auth-actions";

export default async function Home() {
  return (
    <main className="p-3 bg-gray-200 text-black">
      <p className="text-2xl">Landing page</p>
    </main>
  );
}
