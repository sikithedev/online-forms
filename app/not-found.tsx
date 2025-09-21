import Logo from "@/components/nav/Logo";
import { ModeToggle } from "@/components/nav/ModeToggle";
import UserProfileButton from "@/components/nav/UserProfileButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background">
      <nav className="flex justify-between items-center border-b px-4 py-2">
        <Logo />
        <div className="flex gap-4 items-center">
          <ModeToggle />
          <UserProfileButton />
        </div>
      </nav>
      <main className="flex flex-col grow w-full px-4">
        <div className="w-full h-full flex flex-col grow justify-center items-center gap-5 p-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Page Not Found</h2>
            <p className="text-muted-foreground text-center w-md">
              The page you are looking for does not exist or an unexpected error
              occurred.
            </p>
          </div>
          <Button asChild>
            <Link href="/">Go back to home</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
