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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import useDesigner from "@/hooks/useDesigner";
import { cn } from "@/lib/utils";
import { textareaPropertiesSchema } from "@/schemas/form";
import {
  FormElement,
  FormElementCategory,
  FormElementInstance,
  FormElementType,
  SubmitHandler,
} from "@/types/formElements";
import { zodResolver } from "@hookform/resolvers/zod";
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const type: FormElementType = "TextareaField";
const category: FormElementCategory = "input";

const minRows = 3;
const maxRows = 10;

const propertiesSchema = textareaPropertiesSchema(minRows, maxRows);

const defaultAttributes = {
  label: "Textarea field",
  required: false,
  rows: 3,
  placeholder: "Enter text",
  helperText: "Additional information about this field.",
};

export const TextareaFieldFormElement: FormElement = {
  type,
  category,
  construct: (id) => ({
    id,
    type,
    additionalAttributes: defaultAttributes,
  }),
  designerButtonElement: {
    label: "Textarea",
    icon: SubjectRoundedIcon,
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
  const { label, required, rows, placeholder, helperText } = (
    elementInstance as CustomInstance
  ).additionalAttributes;

  return (
    <div className="w-full flex flex-col gap-2">
      <Label>
        {label} {required && "*"}
      </Label>
      <Textarea
        readOnly
        disabled
        placeholder={placeholder}
        rows={rows}
        className="field-sizing-fixed"
      />
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
  disabled,
}: {
  elementInstance: FormElementInstance;
  onSubmit?: SubmitHandler;
  defaultValue?: string;
  isInvalid?: boolean;
  className?: string;
  disabled?: boolean;
}) {
  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState(false);
  const { label, required, rows, placeholder, helperText } = (
    elementInstance as CustomInstance
  ).additionalAttributes;

  useEffect(() => {
    setError(isInvalid || false);
  }, [isInvalid]);

  function handleBlur() {
    if (!onSubmit) return;

    const valid = TextareaFieldFormElement.validate(elementInstance, value);
    setError(!valid);
    if (!valid) return;

    onSubmit(elementInstance.id, value);
  }

  return (
    <div className={cn("w-full flex flex-col gap-2", className)}>
      <Label>
        {label} {required && "*"}
      </Label>
      <Textarea
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        value={value}
        rows={rows}
        className={cn(
          "field-sizing-fixed disabled:opacity-100 disabled:cursor-default",
          error && "border-destructive focus:border-destructive"
        )}
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
        <Separator />
        <FormField
          control={form.control}
          name="rows"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of rows: {form.watch("rows")}</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[field.value]}
                  min={minRows}
                  max={maxRows}
                  onValueChange={([value]) => field.onChange(value)}
                />
              </FormControl>
              <FormDescription>
                The number of rows shown in the textarea.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
