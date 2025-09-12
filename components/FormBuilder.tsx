"use client";

import { Form } from "@/app/generated/prisma";
import React, { useId } from "react";
import PreviewFormButton from "./PreviewFormButton";
import SaveFormButton from "./SaveFormButton";
import PublishFormButton from "./PublishFormButton";
import { Separator } from "./ui/separator";
import Designer from "./Designer";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";
import DesignerContextProvider from "./contexts/DesignerContext";
import useDndSensors from "@/hooks/useDndSensors";

type FormBuilderProps = {
  form: Form;
};

export default function FormBuilder({ form }: FormBuilderProps) {
  const sensors = useDndSensors();
  const dndContextId = useId();

  return (
    <main className="w-full flex flex-col">
      <DesignerContextProvider>
        <nav className="flex justify-between items-center gap-3 border-b p-2">
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
        <div className="w-full flex grow justify-center items-center relative overflow-y-auto bg-[url(/builder/graph-paper.svg)] dark:bg-[url(/builder/graph-paper-dark.svg)]">
          <DndContext sensors={sensors} id={dndContextId}>
            <Designer />
            <DragOverlayWrapper />
          </DndContext>
        </div>
      </DesignerContextProvider>
    </main>
  );
}
