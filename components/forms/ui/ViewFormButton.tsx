"use client";

import { Button } from "@/components/ui/button";

type ViewFormButtonProps = {
  shareUrl: string;
};

export default function ViewFormButton({ shareUrl }: ViewFormButtonProps) {
  const handleClick = () => {
    const shareLink = `${window.location.origin}/submit/${shareUrl}`;
    window.open(shareLink, "_blank");
  };

  return <Button onClick={handleClick}>View form</Button>;
}
