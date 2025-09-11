"use client";

import { TextCursor } from "lucide-react";
import {
  FormElement,
  FormElementInstance,
  FormElementType,
} from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const type: FormElementType = "TextField";

const additionalAttributes = {
  label: "Text field",
  helperText: "Helper text",
  required: false,
  placeholder: "Value here...",
};

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    additionalAttributes,
  }),
  designerButtonElement: {
    label: "Text Field",
    icon: TextCursor,
  },
  designerComponent: DesignerComponent,
  formComponent: () => <div>Form Component</div>,
  propertiesComponent: () => <div>Properties Component</div>,
};

type CustomInstance = FormElementInstance & {
  additionalAttributes: typeof additionalAttributes;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const { label, required, placeholder, helperText } = (
    elementInstance as CustomInstance
  ).additionalAttributes;

  return (
    <div className="w-full flex flex-col gap-2">
      <Label>
        {label} {required && "*"}
      </Label>
      <Input readOnly disabled placeholder={placeholder} />
      {helperText && (
        <p className="text-muted-foreground text-sm">{helperText}</p>
      )}
    </div>
  );
}
