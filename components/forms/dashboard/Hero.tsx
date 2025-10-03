import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="mx-auto flex items-center justify-center p-4">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
        linear-gradient(45deg, transparent 49%, var(--accent) 49%, var(--accent) 51%, transparent 51%),
        linear-gradient(-45deg, transparent 49%, var(--accent) 49%, var(--accent) 51%, transparent 51%)
      `,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="w-full relative">
        <div className="text-center max-w-lg md:max-w-2xl">
          <Badge
            variant="secondary"
            className="rounded-full py-1 px-3 border-border"
          >
            <span
              className="size-1.5 rounded-full bg-green-600 dark:bg-green-400 mr-1"
              aria-hidden="true"
            />
            Just launched - Build forms today
          </Badge>
          <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance">
            Create Beautiful Forms in Minutes
          </h1>
          <p className="mt-6 leading-7 md:text-lg">
            Build and share professional forms with an intuitive drag-and-drop
            interface. Create surveys, polls, and feedback forms. No coding
            required.
          </p>
          <div className="mt-12 flex items-center justify-center gap-4">
            <SignUpButton>
              <Button size="lg" className="rounded-xl text-base cursor-pointer">
                Sign Up
              </Button>
            </SignUpButton>
            <SignInButton>
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl text-base shadow-none !bg-background cursor-pointer"
              >
                Log In
              </Button>
            </SignInButton>
          </div>
        </div>
      </div>
    </div>
  );
}
