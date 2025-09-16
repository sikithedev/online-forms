import React, { ReactNode } from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

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
      icon: <SortRoundedIcon />,
    },
    {
      title: "Form Submissions",
      value: submissions,
      description: "Number of completed form submissions",
      icon: <ArrowUpwardRoundedIcon />,
    },
    {
      title: "Completion Rate",
      value: `${completionRate.toFixed(2)}%`,
      description: "Percentage of views that resulted in a submission",
      icon: <TaskAltRoundedIcon />,
    },
    {
      title: "Abandon Rate",
      value: `${abandonRate.toFixed(2)}%`,
      description: "Percentage of views that ended without a submission",
      icon: <HighlightOffRoundedIcon />,
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
