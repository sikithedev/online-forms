"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ClipboardCopy } from "lucide-react";
import { toast } from "sonner";

type FormLinkShareProps = {
  shareUrl: string;
};

export default function FormLinkShare({ shareUrl }: FormLinkShareProps) {
  const [shareLink, setShareLink] = useState("");

  useEffect(() => {
    setShareLink(`${window.location.origin}/submit/${shareUrl}`);
  }, [shareUrl]);

  function handleClick() {
    navigator.clipboard.writeText(shareLink);
    toast.success("Link copied to clipboard");
  }

  return (
    <div className="flex grow items-center gap-4">
      <Input readOnly value={shareLink} />
      <Button onClick={handleClick}>
        <ClipboardCopy /> Copy link
      </Button>
    </div>
  );
}
