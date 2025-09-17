"use client";

import { getFormSubmissions } from "@/actions/forms";
import React from "react";
import { Form } from "@/app/generated/prisma";
import { FormElementInstance, formElements } from "./forms/formElements";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
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
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {submissions.map((submission, index) => {
        const submissionContent = JSON.parse(submission.content);

        return (
          <Card key={submission.id}>
            <CardHeader>
              <CardTitle>Submission #{index + 1}</CardTitle>
              <CardDescription>
                Submitted:{" "}
                {format(submission.createdAt, "MMM d, yyyy 'at' h:mm a")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">View submission</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="mb-2">
                    <DialogTitle>Submission #{index + 1}</DialogTitle>
                    <DialogDescription>
                      This is a preview of the form submission.
                    </DialogDescription>
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
