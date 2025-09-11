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
          <div className="w-full flex flex-col gap-2 p-4">
            {elements.map((element, index) => (
              <DesignerElement
                key={element.id}
                element={element}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}

type DesignerElementProps = {
  element: FormElementInstance;
  index: number;
};

function DesignerElement({ element, index }: DesignerElementProps) {
  const DesignerComponent = formElements[element.type].designerComponent;

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  return (
    <div className="relative flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset">
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md"
      ></div>
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute bottom-0 w-full h-1/2 rounded-b-md"
      ></div>
      <div className="w-full flex items-center rounded-md p-4 pointer-events-none bg-accent/40">
        <DesignerComponent elementInstance={element} />
      </div>
    </div>
  );
}
