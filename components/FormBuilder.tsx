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

type FormBuilderProps = {
  form: Form;
};

export default function FormBuilder({ form }: FormBuilderProps) {
  const { setElements } = useDesigner();
  const [loading, setLoading] = useState(true);
  const sensors = useDndSensors();
  const id = useId();

  useEffect(() => {
    const elements = JSON.parse(form.content);
    setElements(elements);
    setLoading(false);
  }, [form, setElements]);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoaderCircle className="animate-spin size-12" />
      </div>
    );
  }

  return (
    <main className="w-full flex flex-col">
      <nav className="flex justify-between items-center gap-3 border-b p-2">
        <h2 className="truncate">
          <span className="text-muted-foreground">Form:</span> {form.name}
        </h2>
        <div className="flex items-center gap-2 h-full">
          <PreviewFormButton />
          {!form.published && (
            <>
              <Separator orientation="vertical" />
              <SaveFormButton id={form.id} />
              <PublishFormButton />
            </>
          )}
        </div>
      </nav>
      <div className="w-full flex grow justify-center items-center relative overflow-y-auto bg-[url(/builder/graph-paper.svg)] dark:bg-[url(/builder/graph-paper-dark.svg)]">
        <DndContext sensors={sensors} id={id}>
          <Designer />
          <DragOverlayWrapper />
        </DndContext>
      </div>
    </main>
  );
}
