import { getFormSubmissions } from "@/actions/forms";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Form } from "@/app/generated/prisma";
import { FormElementInstance, FormElementType } from "./FormElements";
import { formatDistance } from "date-fns";

type SubmissionsTableProps = {
  form: Form;
  submissions: Awaited<ReturnType<typeof getFormSubmissions>>;
};

type Column = {
  id: string;
  label: string;
  required: boolean;
  type: FormElementType;
};
type Row = {
  [key: string]: string;
} & { submittedAt: Date };

export default async function SubmissionsTable({
  form,
  submissions,
}: SubmissionsTableProps) {
  const formElements = JSON.parse(form.content) as FormElementInstance[];
  const columns: Column[] = formElements
    .filter((element) => element.type === "TextField")
    .map((element) => ({
      id: element.id,
      label: element.additionalAttributes?.label,
      required: element.additionalAttributes?.required,
      type: element.type,
    }));

  const rows: Row[] = submissions.map((submission) => {
    const content = JSON.parse(submission.content);
    return {
      ...content,
      submittedAt: submission.createdAt,
    };
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.id}>{column.label}</TableHead>
          ))}
          <TableHead>Submitted at</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.submittedAt.toISOString()}>
            {columns.map((column) => (
              <FieldTableCell
                key={column.id}
                type={column.type}
                value={row[column.id]}
              />
            ))}
            <TableCell>
              {formatDistance(row.submittedAt, new Date(), { addSuffix: true })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

type FieldTableCellProps = {
  type: FormElementType;
  value: string;
};

function FieldTableCell({ type, value }: FieldTableCellProps) {
  switch (type) {
    case "TextField":
      return <TableCell>{value}</TableCell>;
  }
}
