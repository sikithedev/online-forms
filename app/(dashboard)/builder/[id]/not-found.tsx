import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-5 p-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Form Not Found</h2>
        <p className="text-muted-foreground text-center w-md">
          The form you are looking for does not exist or an unexpected error
          occurred.
        </p>
      </div>
      <Button asChild>
        <Link href="/">Go back to home</Link>
      </Button>
    </div>
  );
}
