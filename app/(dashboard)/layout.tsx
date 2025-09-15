import Logo from "@/components/Logo";
import { ModeToggle } from "@/components/ModeToggle";
import { UserButton } from "@clerk/nextjs";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background">
      <nav className="flex justify-between items-center border-b px-4 py-2">
        <Logo />
        <div className="flex gap-4 items-center">
          <ModeToggle />
          <UserButton />
        </div>
      </nav>
      <main className="flex grow w-full">{children}</main>
    </div>
  );
}
