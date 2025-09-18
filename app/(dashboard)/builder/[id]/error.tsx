"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-5 p-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Something Went Wrong</h2>
        <p className="text-muted-foreground text-center w-md">
          An unexpected error occurred while loading this page. Please try again
          later or return to the home page.
        </p>
      </div>
      <Button asChild>
        <Link href="/">Go back to home</Link>
      </Button>
    </div>
  );
}
