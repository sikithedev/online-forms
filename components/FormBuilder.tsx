"use client";

import { Form } from "@/app/generated/prisma";
import React from "react";
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

type FormBuilderProps = {
  form: Form;
};

export default function FormBuilder({ form }: FormBuilderProps) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

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
              <SaveFormButton />
              <PublishFormButton />
            </>
          )}
        </div>
      </nav>
      <div className="w-full flex grow justify-center items-center relative overflow-y-auto bg-[url(/builder/graph-paper.svg)] dark:bg-[url(/builder/graph-paper-dark.svg)]">
        <DesignerContextProvider>
          <DndContext sensors={sensors}>
            <Designer />
            <DragOverlayWrapper />
          </DndContext>
        </DesignerContextProvider>
      </div>
    </main>
  );
}
