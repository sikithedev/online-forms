import Logo from "@/components/nav/Logo";
import { ModeToggle } from "@/components/nav/ModeToggle";
import UserProfileButton from "@/components/nav/UserProfileButton";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { Github } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen min-w-full">
        <nav className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl flex justify-between items-center p-4 z-50">
          <Logo />
          <div className="flex gap-2 items-center">
            <ModeToggle variant="ghost" />
            <Button variant="ghost" asChild>
              <Link
                href="https://github.com/sikithedev/online-forms"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github />
              </Link>
            </Button>
          </div>
        </nav>
        <main className="flex grow w-full mt-12">{children}</main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background">
      <nav className="flex justify-between items-center border-b px-4 py-2">
        <Logo />
        <div className="flex gap-4 items-center">
          <ModeToggle />
          <UserProfileButton />
        </div>
      </nav>
      <main className="flex grow w-full">{children}</main>
    </div>
  );
}
