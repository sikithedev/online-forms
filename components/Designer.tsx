"use client";

import React from "react";
import DesignerSidebar from "./DesignerSidebar";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import { cn, generateId } from "@/lib/utils";
import useDesigner from "@/hooks/useDesigner";
import {
  FormElementInstance,
  formElements,
  FormElementType,
} from "./FormElements";

export default function Designer() {
  const { elements, addElement } = useDesigner();
  const { setNodeRef, isOver } = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerButtonElement =
        active.data?.current?.isDesignerButtonElement;

      if (isDesignerButtonElement) {
        const type = active.data?.current?.type as FormElementType;

        const newElement = formElements[type].construct(generateId());

        addElement(0, newElement);
      }
    },
  });

  return (
    <div className="w-full h-full flex">
      <div className="w-full p-4">
        <div
          ref={setNodeRef}
          className={cn(
            "max-w-[920px] h-full m-auto bg-background rounded-xl flex flex-col flex-1 justify-start items-center overflow-y-auto",
            isOver && "ring-2 ring-primary/20"
          )}
        >
          {isOver && (
            <div className="w-full p-2">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {!isOver && elements.length === 0 && (
            <p className="flex grow items-center font-bold text-xl text-muted-foreground">
              Drop here
            </p>
          )}
          <div className="w-full flex flex-col gap-2 p-4 text-background">
            {elements.map((element) => (
              <DesignerElement key={element.id} element={element} />
            ))}
          </div>
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}

function DesignerElement({ element }: { element: FormElementInstance }) {
  const DesignerComponent = formElements[element.type].designerComponent;

  return <DesignerComponent />;
}
