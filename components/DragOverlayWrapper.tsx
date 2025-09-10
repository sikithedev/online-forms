import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import { SidebarButtonDragOverlay } from "./SidebarButton";
import { formElements, FormElementType } from "./FormElements";

export default function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (event) => setDraggedItem(event.active),
    onDragCancel: () => setDraggedItem(null),
    onDragEnd: () => setDraggedItem(null),
  });

  if (!draggedItem) return null;

  const isSidebarButton = draggedItem.data?.current?.isDesignerButtonElement;
  const type = draggedItem.data?.current?.type as FormElementType | undefined;

  return (
    <DragOverlay>
      {isSidebarButton && type ? (
        <SidebarButtonDragOverlay formElement={formElements[type]} />
      ) : (
        <div>No drag overlay</div>
      )}
    </DragOverlay>
  );
}
