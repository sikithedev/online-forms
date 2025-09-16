"use client";

import { Form } from "@/app/generated/prisma";
import React, { useEffect, useId, useState } from "react";
import PreviewFormButton from "./PreviewFormButton";
import SaveFormButton from "./SaveFormButton";
import PublishFormButton from "./PublishFormButton";
import { Separator } from "./ui/separator";
import Designer from "./Designer";
import { DndContext } from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";
import useDndSensors from "@/hooks/useDndSensors";
import useDesigner from "@/hooks/useDesigner";
import { LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import FormLinkShare from "./FormLinkShare";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import InsertChartOutlinedRoundedIcon from "@mui/icons-material/InsertChartOutlinedRounded";

type FormBuilderProps = {
  form: Form;
};

export default function FormBuilder({ form }: FormBuilderProps) {
  const { setElements, setSelectedElement } = useDesigner();
  const [loading, setLoading] = useState(true);
  const sensors = useDndSensors();
  const id = useId();

  useEffect(() => {
    if (!loading) return;

    const elements = JSON.parse(form.content);
    setElements(elements);
    setSelectedElement(null);
    setLoading(false);
  }, [form, setElements, setSelectedElement, loading]);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoaderCircle className="animate-spin size-12" />
      </div>
    );
  }

  if (form.published) {
    return (
      <div className="h-full w-full flex justify-center items-center px-4 text-center">
        <div className="max-w-md flex flex-col gap-4">
          <h1 className="text-center text-4xl font-extrabold tracking-tight text-balance">
            Form Published
          </h1>
          <Separator />
          <h2 className="text-3xl font-semibold tracking-tight">
            Share this form
          </h2>
          <p className="text-lg text-muted-foreground tracking-tight">
            Anyone with the link can view and submit the form
          </p>
          <div className="w-full mb-2">
            <FormLinkShare shareUrl={form.shareUrl} />
          </div>
          <Separator />
          <div className="flex justify-between">
            <Button variant="ghost" asChild>
              <Link href="/">
                <ArrowBackRoundedIcon className="!size-4" /> Back to home
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href={`/forms/${form.id}`}>
                <InsertChartOutlinedRoundedIcon className="!size-4" /> View
                details
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full flex flex-col break-words">
      <nav className="border-b px-4 py-2">
        <div className="flex justify-between items-center gap-2 h-full">
          <h2 className="truncate">
            <span className="text-muted-foreground">Form:</span> {form.name}
          </h2>
          <div className="flex items-center gap-2 h-full">
            <PreviewFormButton published={form.published} />
            {!form.published && (
              <>
                <Separator orientation="vertical" />
                <SaveFormButton id={form.id} />
                <PublishFormButton id={form.id} />
              </>
            )}
          </div>
        </div>
      </nav>
      <div className="w-full flex grow justify-center items-center relative overflow-y-auto bg-accent">
        <DndContext sensors={sensors} id={id}>
          <Designer />
          <DragOverlayWrapper />
        </DndContext>
      </div>
    </main>
  );
}
