import React, { useTransition } from "react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { publishFormById } from "@/actions/forms";
import { useRouter } from "next/navigation";
import useDesigner from "@/hooks/useDesigner";

type PublishFormButtonProps = {
  id: number;
};

export default function PublishFormButton({ id }: PublishFormButtonProps) {
  const router = useRouter();
  const { elements } = useDesigner();
  const [isPending, startTransition] = useTransition();

  async function publishForm() {
    try {
      const content = JSON.stringify(elements);
      await publishFormById(id, content);
      toast.success("Form published successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to publish form. Please try again.");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Publish</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Once published, you will not be able
            to edit the form.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              startTransition(publishForm);
            }}
            disabled={isPending}
            className="min-w-24"
          >
            {isPending ? <LoaderCircle className="animate-spin" /> : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
