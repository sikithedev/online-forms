import { getFormById, getFormSubmissions } from "@/actions/forms";
import FormLinkShare from "@/components/FormLinkShare";
import { StatsCard } from "@/components/StatsCards";
import SubmissionsTable from "@/components/SubmissionsTable";
import { Separator } from "@/components/ui/separator";
import ViewFormButton from "@/components/ViewFormButton";
import { BookDashed } from "lucide-react";
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
  const submissionRate = visits > 0 ? (submissions.length / visits) * 100 : 0;
  const bounceRate = visits > 0 ? 100 - submissionRate : 0;

  const cardsData = [
    {
      title: "Total visits",
      value: visits,
      description: "All time form visits",
      icon: <BookDashed className="text-blue-500" />,
    },
    {
      title: "Total submissions",
      value: submissions.length,
      description: "All time form submissions",
      icon: <BookDashed className="text-yellow-500" />,
    },
    {
      title: "Submission rate",
      value: `${submissionRate.toFixed(2)}%`,
      description: "Visits that result in form submissions",
      icon: <BookDashed className="text-green-500" />,
    },
    {
      title: "Bounce rate",
      value: `${bounceRate.toFixed(2)}%`,
      description: "Visits that don't result in form submissions",
      icon: <BookDashed className="text-red-500" />,
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="border-b border-muted py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold truncate">
          <span className="text-muted-foreground">Form:</span> {form.name}
        </h1>
        <ViewFormButton shareUrl={form.shareUrl} />
      </div>
      <div className="border-b border-muted py-4">
        <div className="ml-auto">
          <FormLinkShare shareUrl={form.shareUrl} />
        </div>
      </div>
      <div className="w-full pt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {cardsData.map((card) => (
          <StatsCard
            key={card.title}
            title={card.title}
            value={card.value.toLocaleString()}
            description={card.description}
            icon={card.icon}
            loading={false}
          />
        ))}
      </div>

      <div className="py-8">
        <h1 className="text-2xl font-bold my-4">Submissions</h1>
        <SubmissionsTable form={form} submissions={submissions} />
      </div>
    </div>
  );
}
