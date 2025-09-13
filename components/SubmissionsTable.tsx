import { getFormSubmissions } from "@/actions/forms";
import React from "react";
import { Table } from "./ui/table";

type SubmissionsTableProps = {
  submissions: Awaited<ReturnType<typeof getFormSubmissions>>;
};

export default function SubmissionsTable({
  submissions,
}: SubmissionsTableProps) {
  return <Table></Table>;
}
