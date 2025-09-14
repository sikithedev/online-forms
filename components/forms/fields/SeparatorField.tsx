"use client";

import { TextCursor } from "lucide-react";
import {
  FormElement,
  FormElementCategory,
  FormElementInstance,
  FormElementType,
} from "../formElements";
import { Label } from "../../ui/label";
import { Separator } from "@/components/ui/separator";

const type: FormElementType = "SeparatorField";
const category: FormElementCategory = "layout";

export const SeparatorFieldFormElement: FormElement = {
  type,
  category,
  construct: (id) => ({
    id,
    type,
  }),
  designerButtonElement: {
    label: "Separator Field",
    icon: TextCursor,
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  return (
    <div className="w-full flex flex-col gap-2">
      <Label className="text-muted-foreground">Separator field</Label>
      <Separator className="mt-2" />
    </div>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  return <Separator />;
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  return <p>This field has no properties.</p>;
}
