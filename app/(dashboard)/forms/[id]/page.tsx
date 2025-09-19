import { getFormById, getFormSubmissions } from "@/actions/forms";
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
  const form = await getFormById(Number(id), { published: true });
  if (!form) {
    notFound();
  }

  const { visits } = form;
  const submissions = await getFormSubmissions(Number(id));

  return (
    <div className="container mx-auto px-4">
      <div className="border-b border-muted py-4 flex justify-between items-center gap-2">
        <h1 className="text-3xl font-semibold tracking-tight truncate">
          <span className="text-muted-foreground">Form:</span> {form.name}
        </h1>
        <div className="flex gap-2">
          <DeleteFormButton id={id} />
          <ViewFormButton shareUrl={form.shareUrl} />
        </div>
      </div>
      <div className="border-b border-muted py-4">
        <div className="ml-auto">
          <FormLinkShare shareUrl={form.shareUrl} />
        </div>
      </div>

      <div className="space-y-4">
        <StatsCards visits={visits} submissions={submissions.length} />
        <Separator />
        <h3 className="text-2xl font-semibold tracking-tight">Submissions</h3>
        <SubmissionCards form={form} submissions={submissions} />
      </div>
    </div>
  );
}
