import { getFormById, getFormSubmissions } from "@/actions/forms";
import DeleteFormButton from "@/components/DeleteFormButton";
import FormLinkShare from "@/components/FormLinkShare";
import StatsCards from "@/components/StatsCards";
import SubmissionCards from "@/components/SubmissionCards";
import ViewFormButton from "@/components/ViewFormButton";
import { notFound } from "next/navigation";
import React from "react";

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

      <StatsCards visits={visits} submissions={submissions.length} />

      <div className="py-8">
        <h1 className="text-2xl font-bold my-4">Submissions</h1>
        <SubmissionCards form={form} submissions={submissions} />
      </div>
    </div>
  );
}
