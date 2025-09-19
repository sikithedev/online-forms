import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUp, CircleCheckBig, CircleX, SquareMenu } from "lucide-react";
import { ReactNode } from "react";

type StatsCardsProps = {
  visits: number;
  submissions: number;
  allForms?: boolean;
};

export default function StatsCards({
  visits,
  submissions,
  allForms = false,
}: StatsCardsProps) {
  const completionRate = visits > 0 ? (submissions / visits) * 100 : 0;
  const abandonRate = visits > 0 ? 100 - completionRate : 0;

  const cardsData = [
    {
      title: "Form views",
      value: visits,
      description: allForms
        ? "Number of times the forms have been viewed"
        : "Number of times this form has been viewed",
      icon: <SquareMenu strokeWidth={1.5} />,
    },
    {
      title: "Form submissions",
      value: submissions,
      description: "Number of completed form submissions",
      icon: <ArrowUp strokeWidth={1.5} />,
    },
    {
      title: "Completion rate",
      value: `${completionRate.toFixed(2)}%`,
      description: "Percentage of views that resulted in a submission",
      icon: <CircleCheckBig strokeWidth={1.5} />,
    },
    {
      title: "Abandon rate",
      value: `${abandonRate.toFixed(2)}%`,
      description: "Percentage of views that ended without a submission",
      icon: <CircleX strokeWidth={1.5} />,
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
          <CardDescription className="text-lg tracking-tight">
            {title}
          </CardDescription>
          <CardTitle className="text-2xl font-semibold">{value}</CardTitle>
        </div>
        <CardAction className="text-muted-foreground">{icon}</CardAction>
      </CardHeader>
      <CardFooter className="text-sm text-muted-foreground">
        {description}
      </CardFooter>
    </Card>
  );
}
