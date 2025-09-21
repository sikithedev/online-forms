"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type FormLinkShareProps = {
  id: string;
  variant?: "default" | "secondary";
  showLink?: boolean;
  className?: string;
};

export default function FormLinkShare({
  id,
  variant = "default",
  showLink,
  className,
}: FormLinkShareProps) {
  const [shareLink, setShareLink] = useState("");

  useEffect(() => {
    setShareLink(`${window.location.origin}/submit/${id}`);
  }, [id]);

  function handleClick() {
    navigator.clipboard.writeText(shareLink);
    toast.success("Link copied to clipboard");
  }

  return (
    <div className={cn("flex grow items-center gap-2", className)}>
      {showLink && <Input readOnly value={shareLink} />}
      <Button variant={variant} onClick={handleClick}>
        Copy link
      </Button>
    </div>
  );
}
