"use client";

import { TextCursor } from "lucide-react";
import {
  FormElement,
  FormElementCategory,
  FormElementInstance,
  FormElementType,
} from "../formElements";
import { Label } from "../../ui/label";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import useDesigner from "@/hooks/useDesigner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Slider } from "@/components/ui/slider";

const type: FormElementType = "SpacerField";
const category: FormElementCategory = "layout";

const minHeight = 5;
const maxHeight = 200;

const propertiesSchema = z.object({
  height: z
    .number()
    .min(minHeight, {
      message: `Height must be at least ${minHeight} pixels.`,
    })
    .max(maxHeight, {
      message: `Height must be at most ${maxHeight} pixels.`,
    }),
});

const defaultAttributes = {
  height: 20,
};

export const SpacerFieldFormElement: FormElement = {
  type,
  category,
  construct: (id) => ({
    id,
    type,
    additionalAttributes: defaultAttributes,
  }),
  designerButtonElement: {
    label: "Spacer Field",
    icon: TextCursor,
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
};

type CustomInstance = FormElementInstance & {
  additionalAttributes: typeof defaultAttributes;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const { height } = (elementInstance as CustomInstance).additionalAttributes;

  return (
    <div className="w-full flex flex-col gap-2">
      <Label className="text-muted-foreground">Spacer field</Label>
      <p className="text-muted-foreground">Height: {height}px</p>
    </div>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const { height } = (elementInstance as CustomInstance).additionalAttributes;

  return <div style={{ height: `${height}px` }}></div>;
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { updateElement } = useDesigner();
  const form = useForm<z.infer<typeof propertiesSchema>>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: { ...element.additionalAttributes },
  });

  useEffect(() => {
    form.reset(element.additionalAttributes);
  }, [element, form]);

  function applyChanges(values: z.infer<typeof propertiesSchema>) {
    updateElement(element.id, { ...element, additionalAttributes: values });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => e.preventDefault()}
        onBlur={form.handleSubmit(applyChanges)}
        className="space-y-3"
      >
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height: {form.watch("height")}px</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[field.value]}
                  min={minHeight}
                  max={maxHeight}
                  onValueChange={([value]) => field.onChange(value)}
                />
              </FormControl>
              <FormDescription>Height of the spacer in pixels</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
