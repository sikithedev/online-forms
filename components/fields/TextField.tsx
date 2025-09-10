"use client";

import { TextCursor } from "lucide-react";
import { FormElement, FormElementType } from "../FormElements";

const type: FormElementType = "TextField";

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    additionalAttributes: {
      label: "Text field",
      helperText: "Helper text",
      required: false,
      placeholder: "Value here...",
    },
  }),
  designerButtonElement: {
    label: "Text Field",
    icon: TextCursor,
  },
  designerComponent: () => <div>Designer Component</div>,
  formComponent: () => <div>Form Component</div>,
  propertiesComponent: () => <div>Properties Component</div>,
};
