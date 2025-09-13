import { getForms } from "@/actions/forms";
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
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}

function FormCard({ form }: FormCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="truncate">{form.name}</CardTitle>
        <CardDescription>
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
        </CardDescription>
        <CardAction className="flex flex-col items-end gap-2">
          {form.published ? (
            <>
              <Badge>Published</Badge>

              <span className="text-muted-foreground text-xs">
                Visits: {form.visits.toLocaleString()} • Submissions:{" "}
                {form.submissions.toLocaleString()}
              </span>
            </>
          ) : (
            <Badge variant="secondary">Draft</Badge>
          )}
        </CardAction>
      </CardHeader>
      <CardContent className="grow">
        {form.description || "No description"}
      </CardContent>
      <CardFooter>
        {form.published ? (
          <Button asChild className="w-full">
            <Link href={`/forms/${form.id}`}>
              <MoveRight /> View submissions
            </Link>
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
