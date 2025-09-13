"use client";

import React from "react";
import { FormElementInstance, formElements } from "./FormElements";
import { Button } from "./ui/button";

type FormSubmitProps = {
  formUrl: string;
  content: FormElementInstance[];
};

export default function FormSubmit({ formUrl, content }: FormSubmitProps) {
  const handleClick = () => {};

  return (
    <div className="w-full flex justify-center items-center p-8">
      <div className="w-full max-w-[620px] flex flex-col gap-4 p-8 border rounded-md overflow-y-auto">
        {content.map((element) => {
          const FormElement = formElements[element.type].formComponent;

          return <FormElement key={element.id} elementInstance={element} />;
        })}
        <Button onClick={handleClick} className="mt-4">
          Submit
        </Button>
      </div>
    </div>
  );
}
