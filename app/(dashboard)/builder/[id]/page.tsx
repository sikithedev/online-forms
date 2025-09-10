import { getFormById } from "@/app/actions/forms";
import FormBuilder from "@/components/FormBuilder";
import React from "react";

export default async function Builder({ params }: { params: { id: string } }) {
  const form = await getFormById(Number(params.id));

  if (!form) {
    throw new Error("Form not found");
  }

  return <FormBuilder form={form} />;
}
