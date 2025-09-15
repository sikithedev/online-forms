import React, { ReactNode } from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { BookDashed } from "lucide-react";
type StatsCardsProps = {
  visits: number;
  submissions: number;
  allForms?: boolean;
};

export default async function StatsCards({
  visits,
  submissions,
  allForms = false,
}: StatsCardsProps) {
  const completionRate = visits > 0 ? (submissions / visits) * 100 : 0;
  const abandonRate = visits > 0 ? 100 - completionRate : 0;

  const cardsData = [
    {
      title: "Form Views",
      value: visits,
      description: allForms
        ? "Number of times the forms have been viewed"
        : "Number of times this form has been viewed",
      icon: <BookDashed className="text-blue-500" />,
    },
    {
      title: "Form Submissions",
      value: submissions,
      description: "Number of completed form submissions",
      icon: <BookDashed className="text-yellow-500" />,
    },
    {
      title: "Completion Rate",
      value: `${completionRate.toFixed(2)}%`,
      description: "Percentage of views that resulted in a submission",
      icon: <BookDashed className="text-green-500" />,
    },
    {
      title: "Abandon Rate",
      value: `${abandonRate.toFixed(2)}%`,
      description: "Percentage of views that ended without a submission",
      icon: <BookDashed className="text-red-500" />,
    },
  ];

  return (
    <div className="w-full pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cardsData.map((card) => (
        <StatsCard key={card.title} {...card} />
      ))}
    </div>
  );
}

type StatsCardProps = {
  title: string;
  value: string | number;
  description: string;
  icon: ReactNode;
  className?: string;
};

export function StatsCard({
  title,
  value,
  description,
  icon,
  className,
}: StatsCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex justify-between items-center">
        <div>
          <CardDescription className="text-lg text-slate-100">
            {title}
          </CardDescription>
          <CardTitle className="text-2xl font-semibold">{value}</CardTitle>
        </div>
        <CardAction>{icon}</CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm text-muted-foreground">
        {description}
      </CardFooter>
    </Card>
  );
}
