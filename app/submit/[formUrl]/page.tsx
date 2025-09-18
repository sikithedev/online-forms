import { getFormContentByUrl } from "@/actions/forms";
import FormSubmit from "@/components/submissions/FormSubmit";
import { FormElementInstance } from "@/types/formElements";
import { notFound } from "next/navigation";

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
