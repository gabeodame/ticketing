import { getCurrentUser } from "@/app/actions/auth-actions";
import { LinkConfig } from "@/app/util/types";
import { link } from "fs";
import Link from "next/link";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const getUser: {
    currentUser: { email: string; id: string; password: string };
  } = await getCurrentUser();

  const currentUser = getUser.currentUser;

  // Assuming currentUser is defined somewhere in your code

  const linkConfigs: (LinkConfig | false)[] = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ];

  const links = linkConfigs
    .filter((linkConfig): linkConfig is LinkConfig => Boolean(linkConfig)) //linkConfig is LinkConfig is a type guard
    .map(({ label, href }) => {
      return (
        <Link key={href} href={href}>
          {label}
        </Link>
      );
    });

  return (
    <section className="h-screen flex flex-col">
      <header>
        <nav className="w-full h-[2.5rem] bg-blue-950 p-8 flex justify-between items-center">
          <Link href="/" passHref className="text-cyan-400 text-3xl">
            GitTix
          </Link>
          <p className="text-gray-200">{currentUser?.email}</p>
          <ul className="flex space-x-6 list-none text-gray-200 ">{links}</ul>
        </nav>
      </header>
      <main className="flex-grow ">{children}</main>
      <footer className="h-[5rem] w-screen bg-blue-950 flex items-center p-8">
        <p className="text-gray-200 p-2">Footer</p>
      </footer>
    </section>
  );
}
