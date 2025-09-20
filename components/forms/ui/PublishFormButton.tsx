import { publishForm } from "@/actions/forms";
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
import useDesigner from "@/hooks/useDesigner";
import { formElementsByCategory } from "@/types/formElements";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

type PublishFormButtonProps = {
  id: string;
};

export default function PublishFormButton({ id }: PublishFormButtonProps) {
  const router = useRouter();
  const { elements } = useDesigner();
  const [isPending, startTransition] = useTransition();

  async function handlePublish() {
    try {
      if (
        !elements.some((el) =>
          formElementsByCategory["input"].includes(el.type)
        )
      ) {
        toast.error(
          "Please add at least one input field to the form before publishing."
        );
        return;
      }

      const content = JSON.stringify(elements);

      await publishForm(id, content);
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
              startTransition(handlePublish);
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
