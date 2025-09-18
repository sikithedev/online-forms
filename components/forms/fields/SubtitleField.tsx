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
import useDesigner from "@/hooks/useDesigner";
import { subtitlePropertiesSchema as propertiesSchema } from "@/schemas/form";
import {
  FormElement,
  FormElementCategory,
  FormElementInstance,
  FormElementType,
} from "@/types/formElements";
import { zodResolver } from "@hookform/resolvers/zod";
import ShortTextRoundedIcon from "@mui/icons-material/ShortTextRounded";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const type: FormElementType = "SubtitleField";
const category: FormElementCategory = "layout";

const defaultAttributes = {
  subtitle: "Text here",
};

export const SubtitleFieldFormElement: FormElement = {
  type,
  category,
  construct: (id) => ({
    id,
    type,
    additionalAttributes: defaultAttributes,
  }),
  designerButtonElement: {
    label: "Subtitle",
    icon: ShortTextRoundedIcon,
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
  const { subtitle } = (elementInstance as CustomInstance).additionalAttributes;

  return (
    <div className="w-full flex flex-col gap-2">
      <Label className="text-muted-foreground">Subtitle field</Label>
      <p className="text-lg">{subtitle}</p>
    </div>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const { subtitle } = (elementInstance as CustomInstance).additionalAttributes;

  return <h2 className="text-lg">{subtitle}</h2>;
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
          name="subtitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtitle</FormLabel>
              <FormControl>
                <Input {...field} onKeyDown={handleEnterBlur} />
              </FormControl>
              <FormDescription>
                This text will be displayed as a subtitle in the form.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
