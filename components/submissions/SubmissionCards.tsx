"use client";

import { getFormSubmissions } from "@/actions/forms";
import { Form } from "@/app/generated/prisma";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormElementInstance, formElements } from "@/types/formElements";
import { format } from "date-fns";

type SubmissionsTableProps = {
  form: Form;
  submissions: Awaited<ReturnType<typeof getFormSubmissions>>;
};

export default function SubmissionCards({
  form,
  submissions,
}: SubmissionsTableProps) {
  const elements = JSON.parse(form.content) as FormElementInstance[];

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {submissions.map((submission, index) => {
        const submissionContent = JSON.parse(submission.content);

        return (
          <Card key={submission.id} className="w-full">
            <CardHeader>
              <CardTitle>Submission #{index + 1}</CardTitle>
              <CardDescription className="truncate">
                <p>Name: {submission.userName}</p>
                <p className="truncate">Email: {submission.userEmail}</p>
                <p>
                  Submitted:{" "}
                  {format(submission.createdAt, "MMM d, yyyy 'at' h:mm a")}
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild className="flex">
                  <Button variant="outline" className="ml-auto">
                    View submission
                  </Button>
                </DialogTrigger>
                <DialogContent aria-describedby={undefined}>
                  <DialogHeader className="mb-2">
                    <DialogTitle>Submission #{index + 1}</DialogTitle>

                    <div className="text-muted-foreground text-sm break-all">
                      <p>Name: {submission.userName}</p>
                      <p>Email: {submission.userEmail}</p>
                      <p>
                        Submitted:{" "}
                        {format(
                          submission.createdAt,
                          "MMM d, yyyy 'at' h:mm a"
                        )}
                      </p>
                    </div>
                  </DialogHeader>
                  <div className="max-h-[400px] grid grid-cols-1 gap-4 overflow-y-auto">
                    {elements.map((element) => {
                      const FormComponent =
                        formElements[element.type].formComponent;

                      if (!FormComponent) {
                        return null;
                      }

                      return (
                        <FormComponent
                          key={element.id}
                          defaultValue={submissionContent[element.id] ?? ""}
                          disabled
                          elementInstance={element}
                          className="break-words"
                        />
                      );
                    })}
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
