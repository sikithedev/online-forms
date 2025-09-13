import { getFormById } from "@/actions/forms";
import DesignerContextProvider from "@/components/contexts/DesignerContext";
import FormBuilder from "@/components/FormBuilder";
import { notFound } from "next/navigation";
import React from "react";

export default async function Builder(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const form = await getFormById(Number(id));

  if (!form) {
    notFound();
  }

  return (
    <DesignerContextProvider>
      <FormBuilder form={form} />
    </DesignerContextProvider>
  );
}
