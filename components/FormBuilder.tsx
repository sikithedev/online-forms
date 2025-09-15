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
import { LoaderCircle, MoveLeft, ReceiptText } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import Confetti from "react-confetti";
import FormLinkShare from "./FormLinkShare";

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
      <>
        <Confetti recycle={false} />
        <div className="h-full w-full flex flex-col items-center justify-center">
          <div className="max-w-md">
            <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10">
              Form Published
            </h1>
            <h2 className="text-2xl">Share this form</h2>
            <h3 className="text-xl text-muted-foreground">
              Anyone with the link can view and submit the form
            </h3>
            <div className="w-full border-b pb-4 my-4">
              <FormLinkShare shareUrl={form.shareUrl} />
            </div>
            <div className="flex justify-between">
              <Button variant="link" asChild>
                <Link href="/" className="gap-2">
                  <MoveLeft /> Back to home
                </Link>
              </Button>
              <Button variant="link" asChild>
                <Link href={`/forms/${form.id}`} className="gap-2">
                  <ReceiptText /> View details
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <main className="w-full flex flex-col break-words">
      <nav className="border-b p-2">
        <div className="container mx-auto flex justify-between items-center h-full">
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
