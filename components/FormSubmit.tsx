"use client";

import React, { use, useRef } from "react";
import { FormElementInstance, formElements } from "./FormElements";
import { Button } from "./ui/button";
import { toast } from "sonner";

type FormSubmitProps = {
  formUrl: string;
  content: FormElementInstance[];
};

export default function FormSubmit({ formUrl, content }: FormSubmitProps) {
  const values = useRef<{ [key: string]: string }>({});
  const errors = useRef<{ [key: string]: boolean }>({});
  const [, setRerender] = React.useState(0); // State to force re-render

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

  function handleClick() {
    if (!validateForm()) {
      setRerender((prev) => prev + 1); // Force re-render to show errors
      toast.error("Please fix the errors in the form.");
    }

    console.log("Submitting form to", formUrl, values.current);
  }

  return (
    <div className="w-full flex justify-center items-center p-8">
      <div className="w-full max-w-[620px] flex flex-col gap-4 p-8 border rounded-md overflow-y-auto">
        {content.map((element) => {
          const FormElement = formElements[element.type].formComponent;

          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              onSubmit={onSubmit}
              defaultValue={values.current[element.id]}
              isInvalid={errors.current[element.id]}
            />
          );
        })}
        <Button onClick={handleClick} className="mt-4">
          Submit
        </Button>
      </div>
    </div>
  );
}
