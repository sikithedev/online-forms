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
        <CardTitle className="truncate leading-normal">{form.name}</CardTitle>
        <CardDescription>
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
        </CardDescription>
        <CardAction className="flex flex-col items-end gap-2">
          {form.published ? (
            <Badge variant="secondary">Published</Badge>
          ) : (
            <Badge variant="outline">Draft</Badge>
          )}
        </CardAction>
      </CardHeader>
      <CardContent className="grow tracking-tight break-words">
        {form.description || "No description"}
      </CardContent>
      {form.published ? (
        <CardFooter className="flex justify-between">
          <div className="flex flex-col text-muted-foreground text-xs">
            <span>Views: {form.visits.toLocaleString()}</span>
            <span>Submissions: {form.submissions.toLocaleString()}</span>
          </div>
          <Button asChild>
            <Link href={`/forms/${form.id}`}>View submissions</Link>
          </Button>
        </CardFooter>
      ) : (
        <CardFooter className="flex justify-end">
          <Button asChild variant="secondary">
            <Link href={`/builder/${form.id}`}>Edit form</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
