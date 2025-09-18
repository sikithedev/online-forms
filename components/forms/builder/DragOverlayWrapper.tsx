import { SidebarButtonDragOverlay } from "@/components/forms/builder/sidebar/SidebarButton";
import useDesigner from "@/hooks/useDesigner";
import { formElements, FormElementType } from "@/types/formElements";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";

export default function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  const { elements } = useDesigner();

  useDndMonitor({
    onDragStart: (event) => setDraggedItem(event.active),
    onDragCancel: () => setDraggedItem(null),
    onDragEnd: () => setDraggedItem(null),
  });

  if (!draggedItem) return null;

  let node = <div>No drag overlay</div>;
  const isSidebarButton = draggedItem.data?.current?.isDesignerButtonElement;

  if (isSidebarButton) {
    const type = draggedItem.data?.current?.type as FormElementType;
    node = <SidebarButtonDragOverlay formElement={formElements[type]} />;
  }

  const isDesignerElement = draggedItem.data?.current?.isDesignerElement;
  if (isDesignerElement) {
    const elementId = draggedItem.data?.current?.elementId;
    const element = elements.find((el) => el.id === elementId);

    if (!element) {
      node = <div>Element not found</div>;
    } else {
      const DesignerElementComponent =
        formElements[element.type].designerComponent;

      node = (
        <div className="w-full flex bg-accent border rounded-md p-4 opacity-50">
          <DesignerElementComponent elementInstance={element} />;
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
}
