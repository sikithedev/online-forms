"use client";

import React, { useState } from "react";
import DesignerSidebar from "./DesignerSidebar";
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { cn, generateId } from "@/lib/utils";
import useDesigner from "@/hooks/useDesigner";
import {
  FormElementInstance,
  formElements,
  FormElementType,
} from "./forms/formElements";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { DesignerContext } from "./contexts/DesignerContext";

function handleDragEnd(
  event: DragEndEvent,
  elements: FormElementInstance[],
  addElement: DesignerContext["addElement"],
  removeElement: DesignerContext["removeElement"]
) {
  const { active, over } = event;
  if (!active || !over) return;

  const activeData = active.data?.current || {};
  const overData = over.data?.current || {};

  // Sidebar button dropped
  if (activeData.isDesignerButtonElement) {
    const type = active.data?.current?.type as FormElementType;
    const newElement = formElements[type].construct(generateId());

    // Dropped on designer area
    if (overData.isDesignerDropArea) {
      addElement(elements.length, newElement);
      return;
    }

    // Dropped on top/bottom of designer element
    if (
      overData.isTopHalfDesignerElement ||
      overData.isBottomHalfDesignerElement
    ) {
      const overIdx = elements.findIndex((el) => el.id === overData.elementId);
      if (overIdx === -1) return;

      const insertIdx = overData.isTopHalfDesignerElement
        ? overIdx
        : overIdx + 1;
      addElement(insertIdx, newElement);
      return;
    }
  }

  // Designer element moved
  if (activeData.isDesignerElement) {
    const activeIdx = elements.findIndex(
      (el) => el.id === activeData.elementId
    );
    if (activeIdx === -1) return;

    const activeElement = { ...elements[activeIdx] };

    // Moved to end (designer drop area)
    if (overData.isDesignerDropArea) {
      removeElement(activeElement.id);
      addElement(elements.length, activeElement);
      return;
    }

    // Moved over another designer element
    if (
      overData.isTopHalfDesignerElement ||
      overData.isBottomHalfDesignerElement
    ) {
      const overIdx = elements.findIndex((el) => el.id === overData.elementId);
      if (overIdx === -1 || activeIdx === overIdx) return;

      removeElement(activeElement.id);
      const insertIdx = overData.isTopHalfDesignerElement
        ? overIdx
        : overIdx + 1;
      addElement(insertIdx, activeElement);
      return;
    }
  }
}

export default function Designer() {
  const { elements, addElement, setSelectedElement, removeElement } =
    useDesigner();

  const { setNodeRef, isOver } = useDroppable({
    id: "designer-drop-area",
    data: { isDesignerDropArea: true },
  });

  useDndMonitor({
    onDragEnd: (event) =>
      handleDragEnd(event, elements, addElement, removeElement),
  });

  return (
    <div className="w-full h-full flex">
      <div onClick={() => setSelectedElement(null)} className="w-full p-4">
        <div
          ref={setNodeRef}
          className="max-w-2xl h-full mx-auto bg-background rounded-xl flex flex-col justify-start items-center overflow-y-auto"
        >
          {elements.length === 0 ? (
            isOver ? (
              <div className="w-full p-2">
                <div className="h-[120px] rounded-md bg-primary/20"></div>
              </div>
            ) : (
              <p className="flex grow items-center font-bold text-xl text-muted-foreground">
                Drop here
              </p>
            )
          ) : (
            <div className="w-full flex flex-col gap-2 p-4">
              {elements.map((element) => (
                <DesignerElement key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}

function DesignerElement({ element }: { element: FormElementInstance }) {
  const { removeElement, setSelectedElement } = useDesigner();
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
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
      className="relative flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md"
      />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute bottom-0 w-full h-1/2 rounded-b-md"
      />

      {isMouseOver && (
        <>
          <div className="absolute top-1/2 left-1/2 -translate-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm text-center">
              Click to show properties or drag to move
            </p>
          </div>
          <div className="absolute right-0 p-2">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedElement(null);
                removeElement(element.id);
              }}
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
