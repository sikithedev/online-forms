import React, { ReactNode } from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { getFormStats } from "@/actions/forms";
import { BookDashed } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

type StatsCardProps = {
  title: string;
  value?: string;
  description: string;
  icon: ReactNode;
  loading: boolean;
  className?: string;
};

export default async function StatsCards() {
  const stats = await getFormStats();
  const cardsData = [
    {
      title: "Total visits",
      value: stats?.totalVisits,
      description: "All time form visits",
      icon: <BookDashed className="text-blue-500" />,
    },
    {
      title: "Total submissions",
      value: stats?.totalSubmissions,
      description: "All time form submissions",
      icon: <BookDashed className="text-yellow-500" />,
    },
    {
      title: "Submission rate",
      value: `${stats?.submissionRate.toFixed(2)}%`,
      description: "Visits that result in form submissions",
      icon: <BookDashed className="text-green-500" />,
    },
    {
      title: "Bounce rate",
      value: `${stats?.bounceRate.toFixed(2)}%`,
      description: "Visits that don't result in form submissions",
      icon: <BookDashed className="text-red-500" />,
    },
  ];

  return (
    <div className="w-full pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
  );
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  loading,
  className,
}: StatsCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex justify-between items-center">
        <div>
          <CardDescription className="text-lg text-slate-100">
            {title}
          </CardDescription>
          <CardTitle className="text-2xl font-semibold">
            {loading ? (
              <Skeleton
                className="h-6
             w-full mt-2 bg-slate-700"
              />
            ) : (
              <span>{value}</span>
            )}
          </CardTitle>
        </div>
        <CardAction>{icon}</CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="text-muted-foreground">{description}</div>
      </CardFooter>
    </Card>
  );
}
