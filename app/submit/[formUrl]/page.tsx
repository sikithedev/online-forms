import { getFormByUrl, getUserSubmissionForForm } from "@/actions/forms";
import FormSubmit from "@/components/submissions/FormSubmit";
import { Separator } from "@/components/ui/separator";
import { FormElementInstance } from "@/types/formElements";

import { notFound } from "next/navigation";

export default async function Submit(props: {
  params: Promise<{ formUrl: string }>;
}) {
  const { formUrl } = await props.params;
  let form;
  try {
    form = await getFormByUrl(formUrl);
  } catch (e) {
    notFound();
  }

  const existingSubmission = await getUserSubmissionForForm(form.id);

  if (existingSubmission) {
    return (
      <div className="w-full h-full flex justify-center items-center p-4 text-center">
        <div className="w-full max-w-md space-y-4 p-8 border rounded-md">
          <h2 className="text-3xl font-semibold tracking-tight">
            Form already submitted
          </h2>
          <Separator />
          <p className="text-muted-foreground">
            It looks like you've already submitted this form. You can't submit
            it again.
          </p>
        </div>
      </div>
    );
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return <FormSubmit formUrl={formUrl} content={formContent} />;
}
