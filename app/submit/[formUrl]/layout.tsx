import Logo from "@/components/nav/Logo";
import { ModeToggle } from "@/components/nav/ModeToggle";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background">
      <nav className="border-b border-border h-14 px-4 py-2">
        <div className="container mx-auto flex justify-between items-center">
          <Logo />
          <ModeToggle />
        </div>
      </nav>
      <main className="flex flex-col grow w-full px-4">{children}</main>
    </div>
  );
}
