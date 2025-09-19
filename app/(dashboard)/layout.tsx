import Logo from "@/components/nav/Logo";
import { ModeToggle } from "@/components/nav/ModeToggle";
import UserProfileButton from "@/components/nav/UserProfileButton";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
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
