import { getForm, getFormSubmissions } from "@/actions/forms";
import StatsCards from "@/components/forms/dashboard/StatsCards";
import DeleteFormButton from "@/components/forms/ui/DeleteFormButton";
import FormLinkShare from "@/components/forms/ui/FormLinkShare";
import ViewFormButton from "@/components/forms/ui/ViewFormButton";
import SubmissionCards from "@/components/submissions/SubmissionCards";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";

export default async function Details(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const form = await getForm(id, {
    currentUser: true,
    published: true,
  });

  if (!form) {
    notFound();
  }

  const { visits } = form;
  const submissions = await getFormSubmissions(id);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-4">
        <h2 className="text-2xl font-semibold tracking-tight truncate flex items-center gap-2">
          <span className="text-muted-foreground">Form:</span>
          {form.name}
        </h2>

        <div className="flex items-center gap-2 justify-between sm:justify-end">
          <FormLinkShare id={form.id} variant="secondary" className="grow-0" />
          <div className="flex items-center gap-2">
            <div className="border-r h-6 hidden sm:block"></div>
            <DeleteFormButton id={id} />
            <ViewFormButton id={form.id} />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <StatsCards visits={visits} submissions={submissions.length} />
        <Separator />
        <h3 className="text-2xl font-semibold tracking-tight">Submissions</h3>
        <SubmissionCards form={form} submissions={submissions} />
      </div>
    </div>
  );
}
