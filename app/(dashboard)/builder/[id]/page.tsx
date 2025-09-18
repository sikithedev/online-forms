import { getFormById } from "@/actions/forms";
import DesignerContextProvider from "@/components/contexts/DesignerContext";
import FormBuilder from "@/components/forms/builder/FormBuilder";
import { notFound } from "next/navigation";

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
