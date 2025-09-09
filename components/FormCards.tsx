import { getForms } from "@/app/actions/forms";
import { Form } from "@/app/generated/prisma";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { formatDistance } from "date-fns";
import { Button } from "./ui/button";
import Link from "next/link";
import { FilePen, MoveRight } from "lucide-react";

type FormCardProps = {
  form: Form & { submissions: number };
};

export default async function FormCards() {
  const forms = await getForms();

  return (
    <div>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </div>
  );
}

function FormCard({ form }: FormCardProps) {
  return (
    <Card className="h-48">
      <CardHeader>
        <CardTitle className="truncate">{form.name}</CardTitle>
        <CardDescription>
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {form.published && (
            <span className="flex items-center gap-2 text-muted-foreground">
              <span>Visits: {form.visits.toLocaleString()}</span>
              <span>Submissions: {form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
        <CardAction>
          {form.published ? (
            <Badge>Published</Badge>
          ) : (
            <Badge variant="secondary">Draft</Badge>
          )}
        </CardAction>
      </CardHeader>
      <CardContent>{form.description || "No description"}</CardContent>
      <CardFooter>
        {form.published ? (
          <Button asChild className="w-full">
            <MoveRight />
            View submissions
            <Link href={`/forms/${form.id}`}></Link>
          </Button>
        ) : (
          <Button asChild variant="secondary" className="w-full">
            <Link href={`/builder/${form.id}`}>
              <FilePen /> Edit form
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
