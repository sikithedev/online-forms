"use client";

import { TextCursor } from "lucide-react";
import {
  FormElement,
  FormElementCategory,
  FormElementInstance,
  FormElementType,
  SubmitHandler,
} from "../formElements";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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
import { Switch } from "../../ui/switch";
import { Separator } from "../../ui/separator";
import { cn } from "@/lib/utils";

const type: FormElementType = "NumberField";
const category: FormElementCategory = "input";

const propertiesSchema = z.object({
  label: z.string().max(64, {
    message: "Label must be at most 64 characters.",
  }),
  required: z.boolean(),
  placeholder: z.string().max(64, {
    message: "Placeholder must be at most 64 characters.",
  }),
  helperText: z.string().max(128, {
    message: "Helper text must be at most 128 characters.",
  }),
});

const defaultAttributes = {
  label: "Number field",
  required: false,
  placeholder: "Enter a number",
  helperText: "Additional information about this field.",
};

export const NumberFieldFormElement: FormElement = {
  type,
  category,
  construct: (id) => ({
    id,
    type,
    additionalAttributes: defaultAttributes,
  }),
  designerButtonElement: {
    label: "Number Field",
    icon: TextCursor,
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (element, currentValue) => {
    const { required } = (element as CustomInstance).additionalAttributes;
    return required ? currentValue.trim().length > 0 : true;
  },
};

type CustomInstance = FormElementInstance & {
  additionalAttributes: typeof defaultAttributes;
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
      <Input type="number" readOnly disabled placeholder={placeholder} />
      {helperText && (
        <p className="text-muted-foreground text-sm">{helperText}</p>
      )}
    </div>
  );
}

function FormComponent({
  elementInstance,
  onSubmit,
  defaultValue,
  isInvalid,
  className,
}: {
  elementInstance: FormElementInstance;
  onSubmit?: SubmitHandler;
  defaultValue?: string;
  isInvalid?: boolean;
  className?: string;
}) {
  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState(false);
  const { label, required, placeholder, helperText } = (
    elementInstance as CustomInstance
  ).additionalAttributes;

  useEffect(() => {
    setError(isInvalid || false);
  }, [isInvalid]);

  function handleBlur() {
    if (!onSubmit) return;

    const valid = NumberFieldFormElement.validate(elementInstance, value);
    setError(!valid);
    if (!valid) return;

    onSubmit(elementInstance.id, value);
  }

  return (
    <div className={cn("w-full flex flex-col gap-2", className)}>
      <Label>
        {label} {required && "*"}
      </Label>
      <Input
        type="number"
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        value={value}
        className={cn(error && "border-destructive focus:border-destructive")}
      />
      {helperText && (
        <p className="text-muted-foreground text-sm">{helperText}</p>
      )}
    </div>
  );
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
                <Input type="number" {...field} onKeyDown={handleEnterBlur} />
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
