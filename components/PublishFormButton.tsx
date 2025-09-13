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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { publishFormById } from "@/app/actions/forms";
import { useRouter } from "next/navigation";

type PublishFormButtonProps = {
  id: number;
};

export default function PublishFormButton({ id }: PublishFormButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function publishForm() {
    try {
      await publishFormById(id);
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
          >
            {isPending && <Loader2 className="animate-spin" />} Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
