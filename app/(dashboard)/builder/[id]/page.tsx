import { getFormById } from "@/app/actions/forms";
import FormBuilder from "@/components/FormBuilder";
import React from "react";

export default async function Builder(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const form = await getFormById(Number(id));

  if (!form) {
    throw new Error("Form not found");
  }

  return <FormBuilder form={form} />;
}
