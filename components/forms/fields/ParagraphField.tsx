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
import { Textarea } from "@/components/ui/textarea";
import useDesigner from "@/hooks/useDesigner";
import { paragraphPropertiesSchema as propertiesSchema } from "@/schemas/form";
import {
  FormElement,
  FormElementCategory,
  FormElementInstance,
  FormElementType,
} from "@/types/formElements";
import { zodResolver } from "@hookform/resolvers/zod";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const type: FormElementType = "ParagraphField";
const category: FormElementCategory = "layout";

const defaultAttributes = {
  text: "Text here",
};

export const ParagraphFieldFormElement: FormElement = {
  type,
  category,
  construct: (id) => ({
    id,
    type,
    additionalAttributes: defaultAttributes,
  }),
  designerButtonElement: {
    label: "Paragraph",
    icon: NotesRoundedIcon,
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
  const { text } = (elementInstance as CustomInstance).additionalAttributes;

  return (
    <div className="w-full flex flex-col gap-2">
      <Label className="text-muted-foreground">Paragraph field</Label>
      <p>{text}</p>
    </div>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const { text } = (elementInstance as CustomInstance).additionalAttributes;

  return <p>{text}</p>;
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

  function handleEnterBlur(e: React.KeyboardEvent<HTMLTextAreaElement>) {
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
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paragraph</FormLabel>
              <FormControl>
                <Textarea rows={5} {...field} onKeyDown={handleEnterBlur} />
              </FormControl>
              <FormDescription>
                This text will be displayed as a paragraph in the form.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
