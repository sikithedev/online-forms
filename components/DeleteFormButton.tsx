"use client";

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
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { deleteFormById } from "@/actions/forms";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface DeleteFormButtonProps {
  id: string;
}

export default function DeleteFormButton({ id }: DeleteFormButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function deleteForm() {
    try {
      await deleteFormById(Number(id));
      toast.success("Form deleted successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to delete form. Please try again.");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <DeleteOutlineRoundedIcon className="!size-4" /> Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the form.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              startTransition(deleteForm);
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
