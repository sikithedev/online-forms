"use client";

import { Button } from "@/components/ui/button";

type ViewFormButtonProps = {
  id: string;
};

export default function ViewFormButton({ id }: ViewFormButtonProps) {
  const handleClick = () => {
    const shareLink = `${window.location.origin}/submit/${id}`;
    window.open(shareLink, "_blank");
  };

  return <Button onClick={handleClick}>View form</Button>;
}
