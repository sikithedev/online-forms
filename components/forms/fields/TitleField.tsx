"use client";

import { TextCursor } from "lucide-react";
import {
  FormElement,
  FormElementInstance,
  FormElementType,
} from "../formElements";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import useDesigner from "@/hooks/useDesigner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";

const type: FormElementType = "TitleField";

const additionalAttributes = {
  title: "Title field",
};

const propertiesSchema = z.object({
  title: z.string().min(4).max(64),
});

export const TitleFieldFormElement: FormElement = {
  type,
  construct: (id) => ({
    id,
    type,
    additionalAttributes,
  }),
  designerButtonElement: {
    label: "Title Field",
    icon: TextCursor,
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
};

type CustomInstance = FormElementInstance & {
  additionalAttributes: typeof additionalAttributes;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const { title } = (elementInstance as CustomInstance).additionalAttributes;

  return (
    <div className="w-full flex flex-col gap-2">
      <Label className="text-muted-foreground">Title field</Label>
      <p className="text-xl">{title}</p>
    </div>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const { title } = (elementInstance as CustomInstance).additionalAttributes;

  return <h1 className="text-xl">{title}</h1>;
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} onKeyDown={handleEnterBlur} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
