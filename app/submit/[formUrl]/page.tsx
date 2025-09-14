import { getFormContentByUrl } from "@/actions/forms";
import { FormElementInstance } from "@/components/forms/formElements";
import FormSubmit from "@/components/FormSubmit";
import { notFound } from "next/navigation";
import React from "react";

export default async function Submit(props: {
  params: Promise<{ formUrl: string }>;
}) {
  const { formUrl } = await props.params;
  let form;
  try {
    form = await getFormContentByUrl(formUrl);
  } catch (e) {
    notFound();
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return <FormSubmit formUrl={formUrl} content={formContent} />;
}
