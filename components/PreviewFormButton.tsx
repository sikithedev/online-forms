import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import useDesigner from "@/hooks/useDesigner";
import { formElements } from "./FormElements";

export default function PreviewFormButton() {
  const { elements } = useDesigner();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Preview</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogTitle>Form Preview</DialogTitle>
          <DialogDescription>
            This is a live preview of your form. You can review how your form
            will look before sharing it.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 overflow-y-auto max-h-[400px]">
          {elements.length === 0 ? (
            <p className="text-muted-foreground text-center">
              No fields have been added yet. Use the sidebar to add form fields.
            </p>
          ) : (
            elements.map((element) => {
              const FormComponent = formElements[element.type].formComponent;

              return (
                <FormComponent key={element.id} elementInstance={element} />
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
