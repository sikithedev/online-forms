"use client";

import { Plus, X } from "lucide-react";
import ListRoundedIcon from "@mui/icons-material/ListRounded";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { selectPropertiesSchema as propertiesSchema } from "@/schemas/form";

const type: FormElementType = "SelectField";
const category: FormElementCategory = "input";

const defaultAttributes = {
  label: "Select field",
  required: false,
  placeholder: "Select an option",
  helperText: "Additional information about this field.",
  options: [],
};

export const SelectFieldFormElement: FormElement = {
  type,
  category,
  construct: (id) => ({
    id,
    type,
    additionalAttributes: defaultAttributes,
  }),
  designerButtonElement: {
    label: "Select",
    icon: ListRoundedIcon,
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
      <Select>
        <SelectTrigger disabled className="w-52">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </Select>
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
  const { label, required, placeholder, helperText, options } = (
    elementInstance as CustomInstance
  ).additionalAttributes;

  useEffect(() => {
    setError(isInvalid || false);
  }, [isInvalid]);

  function handleValueChange(value: string) {
    setValue(value);

    if (!onSubmit) return;

    const valid = SelectFieldFormElement.validate(elementInstance, value);
    setError(!valid);
    if (!valid) return;

    onSubmit(elementInstance.id, value);
  }

  return (
    <div className={cn("w-full flex flex-col gap-2", className)}>
      <Label>
        {label} {required && "*"}
      </Label>
      <Select defaultValue={value} onValueChange={handleValueChange}>
        <SelectTrigger
          disabled={disabled}
          className={cn(
            "w-52 disabled:opacity-100 disabled:cursor-default",
            error && "border-destructive focus:border-destructive"
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
  const [newOption, setNewOption] = useState("");
  const [error, setError] = useState(false);
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

  function addOption(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    const option = newOption.trim();

    if (option === "") {
      setError(true);
      return;
    }

    const options = form.getValues("options");

    if (options.includes(option)) {
      setError(true);
      return;
    }

    form.setValue("options", [...options, option]);
    setNewOption("");
    setError(false);
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
                    disabled={form.watch("options").length === 0}
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
          name="options"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Options</FormLabel>
              <div className="flex items-center gap-2">
                <Input
                  value={newOption}
                  onChange={(e) => {
                    setNewOption(e.target.value);
                    setError(false);
                  }}
                  placeholder="New option"
                  className={cn(
                    "transition-colors",
                    error && "border-destructive focus:border-destructive"
                  )}
                />
                <Button variant="outline" onClick={addOption}>
                  <Plus />
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {form.watch("options").map((option, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <div className="w-full bg-accent py-1 px-3 rounded-md border flex justify-between items-center">
                      <span className="break-all">{option}</span>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          const updated = [...form.getValues("options")];
                          updated.splice(index, 1);
                          form.setValue("options", updated);
                          applyChanges(form.getValues());
                        }}
                        className="!p-0 ml-3 h-fit"
                      >
                        <X />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <FormDescription>
                The options shown inside the input.
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
