"use client";

import { deleteSubmission } from "@/actions/forms";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface DeleteSubmissionButtonProps {
  id: string;
}

export default function DeleteSubmissionButton({
  id,
}: DeleteSubmissionButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    try {
      await deleteSubmission(id);
      toast.success("Submission deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete submission. Please try again.");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-card text-foreground border hover:text-white hover:bg-destructive/90 hover:border-destructive/0 dark:hover:bg-destructive/60 dark:hover:border-destructive/0">
          <Trash2 strokeWidth={1.75} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            submission.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              startTransition(handleDelete);
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
