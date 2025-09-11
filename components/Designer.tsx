"use client";

import React, { useState } from "react";
import DesignerSidebar from "./DesignerSidebar";
import { useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { cn, generateId } from "@/lib/utils";
import useDesigner from "@/hooks/useDesigner";
import {
  FormElementInstance,
  formElements,
  FormElementType,
} from "./FormElements";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

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
          className="max-w-[920px] h-full m-auto bg-background rounded-xl flex flex-col flex-1 justify-start items-center overflow-y-auto"
        >
          {isOver && elements.length === 0 && (
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
  const { removeElement } = useDesigner();

  const [isMouseOver, setIsMouseOver] = useState(false);
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
  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;

  const DesignerComponent = formElements[element.type].designerComponent;

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      className="relative flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md"
      ></div>
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute bottom-0 w-full h-1/2 rounded-b-md"
      ></div>
      {isMouseOver && (
        <>
          <div className="absolute top-1/2 left-1/2 -translate-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm text-center">
              Click to show properties or drag to move
            </p>
          </div>
          <div className="absolute right-0 p-2">
            <Button
              onClick={() => removeElement(element.id)}
              variant="destructive"
              className="cursor-pointer"
            >
              <Trash2 />
            </Button>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute -top-2 w-full h-2 rounded-md bg-primary/20"></div>
      )}
      <div
        className={cn(
          "w-full flex items-center rounded-md p-4 pointer-events-none bg-accent/40",
          isMouseOver && "opacity-30"
        )}
      >
        <DesignerComponent elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute -bottom-2 w-full h-2 rounded-md bg-primary/20"></div>
      )}
    </div>
  );
}
