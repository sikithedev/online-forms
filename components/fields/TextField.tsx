"use client";

import { TextCursor } from "lucide-react";
import {
  FormElement,
  FormElementInstance,
  FormElementType,
} from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
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
} from "../ui/form";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";

const type: FormElementType = "TextField";

const additionalAttributes = {
  label: "Text field",
  required: false,
  placeholder: "Value here...",
  helperText: "Helper text",
};

const propertiesSchema = z.object({
  label: z.string().min(4).max(32),
  required: z.boolean(),
  placeholder: z.string().max(64),
  helperText: z.string().max(128),
});

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
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};

type CustomInstance = FormElementInstance & {
  additionalAttributes: typeof additionalAttributes;
};

type ComponentProps = {
  elementInstance: FormElementInstance;
};

function DesignerComponent({ elementInstance }: ComponentProps) {
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

function FormComponent({ elementInstance }: ComponentProps) {
  const { label, required, placeholder, helperText } = (
    elementInstance as CustomInstance
  ).additionalAttributes;

  return (
    <div className="w-full flex flex-col gap-2">
      <Label>
        {label} {required && "*"}
      </Label>
      <Input placeholder={placeholder} />
      {helperText && (
        <p className="text-muted-foreground text-sm">{helperText}</p>
      )}
    </div>
  );
}

function PropertiesComponent({ elementInstance }: ComponentProps) {
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

  function handleEnterBlur(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") e.currentTarget.blur();
  }

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
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input {...field} onKeyDown={handleEnterBlur} />
              </FormControl>
              <FormDescription>
                The label shown above the input field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-2 items-center">
                <FormLabel>Required</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      if (document.activeElement instanceof HTMLElement) {
                        document.activeElement.blur();
                      }
                    }}
                  />
                </FormControl>
              </div>
              <FormDescription>Whether the field is required.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="placeholder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input {...field} onKeyDown={handleEnterBlur} />
              </FormControl>
              <FormDescription>
                The placeholder text shown inside the input.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper text</FormLabel>
              <FormControl>
                <Input {...field} onKeyDown={handleEnterBlur} />
              </FormControl>
              <FormDescription>
                Additional text shown below the input.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
