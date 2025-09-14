import React, { useTransition } from "react";
import { Button } from "./ui/button";
import useDesigner from "@/hooks/useDesigner";
import { updateFormContent } from "@/actions/forms";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type SaveFormButtonProps = {
  id: number;
};

export default function SaveFormButton({ id }: SaveFormButtonProps) {
  const { elements } = useDesigner();
  const [isPending, startTransition] = useTransition();

  async function saveFormContent() {
    try {
      const content = JSON.stringify(elements);
      await updateFormContent(id, content);
      toast.success("Form saved successfully");
    } catch (error) {
      toast.error("Failed to save form. Please try again.");
    }
  }

  return (
    <Button
      variant="outline"
      disabled={isPending}
      onClick={() => startTransition(saveFormContent)}
    >
      {isPending && <Loader2 className="animate-spin" />} Save
    </Button>
  );
}
