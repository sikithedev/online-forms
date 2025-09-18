"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import useDesigner from "@/hooks/useDesigner";
import { spacerPropertiesSchema } from "@/schemas/form";
import {
  FormElement,
  FormElementCategory,
  FormElementInstance,
  FormElementType,
} from "@/types/formElements";
import { zodResolver } from "@hookform/resolvers/zod";
import HeightRoundedIcon from "@mui/icons-material/HeightRounded";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const type: FormElementType = "SpacerField";
const category: FormElementCategory = "layout";

const minHeight = 5;
const maxHeight = 200;

const propertiesSchema = spacerPropertiesSchema(minHeight, maxHeight);

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
    label: "Spacer",
    icon: HeightRoundedIcon,
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
