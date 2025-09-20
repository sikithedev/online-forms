import {
  incrementFormVisits,
  getUserSubmissionForForm,
  getForm,
} from "@/actions/forms";
import FormSubmit from "@/components/submissions/FormSubmit";
import { Separator } from "@/components/ui/separator";
import { FormElementInstance } from "@/types/formElements";
import { notFound } from "next/navigation";

export default async function Submit(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const form = await getForm(id, { published: true });

  if (!form) {
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

  incrementFormVisits(id);

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return <FormSubmit id={id} content={formContent} />;
}
