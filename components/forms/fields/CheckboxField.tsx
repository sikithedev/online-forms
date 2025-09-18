"use client";

import { Checkbox } from "@/components/ui/checkbox";
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
import { Switch } from "@/components/ui/switch";
import useDesigner from "@/hooks/useDesigner";
import { cn } from "@/lib/utils";
import { checkboxPropertiesSchema as propertiesSchema } from "@/schemas/form";
import {
  FormElement,
  FormElementCategory,
  FormElementInstance,
  FormElementType,
  SubmitHandler,
} from "@/types/formElements";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const type: FormElementType = "CheckboxField";
const category: FormElementCategory = "input";

const defaultAttributes = {
  label: "Checkbox field",
  required: false,
  helperText: "Additional information about this field.",
};

export const CheckboxFieldFormElement: FormElement = {
  type,
  category,
  construct: (id) => ({
    id,
    type,
    additionalAttributes: defaultAttributes,
  }),
  designerButtonElement: {
    label: "Checkbox",
    icon: CheckBoxRoundedIcon,
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (element, currentValue) => {
    const { required } = (element as CustomInstance).additionalAttributes;
    return required ? currentValue === "true" : true;
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
  const { label, required, helperText } = (elementInstance as CustomInstance)
    .additionalAttributes;
  const id = `checkbox-${elementInstance.id}`;

  return (
    <div className="flex items-top gap-2">
      <Checkbox id={id} />
      <div className="grid gap-2 leading-none">
        <Label htmlFor={id}>
          {label} {required && "*"}
        </Label>
        {helperText && (
          <p className="text-muted-foreground text-sm">{helperText}</p>
        )}
      </div>
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
  const [value, setValue] = useState(defaultValue === "true");
  const [error, setError] = useState(false);
  const { label, required, helperText } = (elementInstance as CustomInstance)
    .additionalAttributes;
  const id = `checkbox-${elementInstance.id}`;

  useEffect(() => {
    setError(isInvalid || false);
  }, [isInvalid]);

  function handleCheckedChange(checked: boolean) {
    setValue(checked);

    if (!onSubmit) return;

    const valid = CheckboxFieldFormElement.validate(
      elementInstance,
      checked.toString()
    );
    setError(!valid);
    if (!valid) return;

    onSubmit(elementInstance.id, checked.toString());
  }

  return (
    <div className="flex items-top gap-2">
      <Checkbox
        id={id}
        checked={value}
        disabled={disabled}
        onCheckedChange={handleCheckedChange}
        className={cn("disabled:cursor-default", error && "border-destructive")}
      />
      <div className="grid gap-2 leading-none">
        <Label htmlFor={id}>
          {label} {required && "*"}
        </Label>
        {helperText && (
          <p className="text-muted-foreground text-sm">{helperText}</p>
        )}
      </div>
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
