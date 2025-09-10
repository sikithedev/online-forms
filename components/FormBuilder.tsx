"use client";

import { Form } from "@/app/generated/prisma";
import React from "react";
import PreviewFormButton from "./PreviewFormButton";
import SaveFormButton from "./SaveFormButton";
import PublishFormButton from "./PublishFormButton";
import { Separator } from "./ui/separator";
import Designer from "./Designer";
import { DndContext } from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";

type FormBuilderProps = {
  form: Form;
};

export default function FormBuilder({ form }: FormBuilderProps) {
  return (
    <main className="w-full flex flex-col">
      <nav className="flex justify-between items-center gap-3 border-b p-4">
        <h2 className="truncate">
          <span className="text-muted-foreground">Form:</span> {form.name}
        </h2>
        <div className="flex items-center gap-2 h-full">
          <PreviewFormButton />
          {!form.published && (
            <>
              <Separator orientation="vertical" />
              <SaveFormButton />
              <PublishFormButton />
            </>
          )}
        </div>
      </nav>
      <div className="w-full h-[200px] flex grow justify-center items-center relative overflow-y-auto bg-[url(/builder/graph-paper.svg)] dark:bg-[url(/builder/graph-paper-dark.svg)]">
        <DndContext>
          <Designer />
          <DragOverlayWrapper />
        </DndContext>
      </div>
    </main>
  );
}
