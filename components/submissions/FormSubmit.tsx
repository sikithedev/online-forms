"use client";

import { submitForm } from "@/actions/forms";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormElementInstance, formElements } from "@/types/formElements";
import { LoaderCircle } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

type FormSubmitProps = {
  id: string;
  content: FormElementInstance[];
};

export default function FormSubmit({ id, content }: FormSubmitProps) {
  const values = useRef<{ [key: string]: string }>({});
  const errors = useRef<{ [key: string]: boolean }>({});
  const [, setRerender] = useState(0); // State to force re-render
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  function validateForm() {
    let isValid = true;

    content.forEach((element) => {
      const currentValue = values.current[element.id] || "";
      const valid = formElements[element.type].validate(element, currentValue);
      errors.current[element.id] = !valid;

      if (!valid) isValid = false;
    });

    return isValid;
  }

  function onSubmit(key: string, value: string) {
    values.current[key] = value;
  }

  async function handleClick() {
    if (!validateForm()) {
      setRerender((prev) => prev + 1); // Force re-render to show errors
      toast.error("Please fix the errors in the form.");
      return;
    }

    try {
      const content = JSON.stringify(values.current);
      await submitForm(id, content);
      setSubmitted(true);
      toast.success("Form submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className="w-full h-full flex justify-center items-center p-4 text-center">
        <div className="w-full max-w-md space-y-4 p-8 border rounded-md">
          <h2 className="text-3xl font-semibold tracking-tight">Thank you!</h2>
          <Separator />
          <p className="text-muted-foreground">
            Your response has been successfully recorded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-center py-4">
      <div className="w-full max-w-[600px] flex flex-col gap-4 p-8 border rounded-md overflow-y-auto">
        {content.map((element) => {
          const FormElement = formElements[element.type].formComponent;

          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              onSubmit={onSubmit}
              defaultValue={values.current[element.id]}
              isInvalid={errors.current[element.id]}
              className="break-words"
            />
          );
        })}
        <Button
          onClick={() => startTransition(handleClick)}
          disabled={isPending}
          className="ml-auto min-w-20"
        >
          {isPending ? <LoaderCircle className="animate-spin" /> : "Submit"}
        </Button>
      </div>
    </div>
  );
}
