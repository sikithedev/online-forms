"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type FormLinkShareProps = {
  id: string;
};

export default function FormLinkShare({ id }: FormLinkShareProps) {
  const [shareLink, setShareLink] = useState("");

  useEffect(() => {
    setShareLink(`${window.location.origin}/submit/${id}`);
  }, [id]);

  function handleClick() {
    navigator.clipboard.writeText(shareLink);
    toast.success("Link copied to clipboard");
  }

  return (
    <div className="flex grow items-center gap-2">
      <Input readOnly value={shareLink} />
      <Button onClick={handleClick}>Copy link</Button>
    </div>
  );
}
