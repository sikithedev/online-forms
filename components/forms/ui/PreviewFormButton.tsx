import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useDesigner from "@/hooks/useDesigner";
import { formElements } from "@/types/formElements";

type PreviewFormButtonProps = {
  published: boolean;
};

export default function PreviewFormButton({
  published,
}: PreviewFormButtonProps) {
  const { elements } = useDesigner();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Preview</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogTitle>Form Preview</DialogTitle>
          <DialogDescription>
            This is a live preview of your form.{" "}
            {published
              ? "The form is published and cannot be edited."
              : "You can review how your form will look before publising it."}
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[400px] grid grid-cols-1 gap-4 overflow-y-auto">
          {elements.length === 0 ? (
            <p className="text-muted-foreground text-center">
              No fields have been added yet. Use the sidebar to add form fields.
            </p>
          ) : (
            elements.map((element) => {
              const FormComponent = formElements[element.type].formComponent;

              return (
                <FormComponent
                  key={element.id}
                  elementInstance={element}
                  className="break-words"
                />
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
