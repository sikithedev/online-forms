import React from "react";
import { FormElement } from "./FormElements";
import { Button } from "./ui/button";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

type SidebarButtonProps = {
  formElement: FormElement;
};

export default function SidebarButton({ formElement }: SidebarButtonProps) {
  const { label, icon: Icon } = formElement.designerButtonElement;
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerButtonElement: true,
    },
  });

  return (
    <Button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      variant="outline"
      className={cn(
        "h-24 flex flex-col gap-2 cursor-grab",
        isDragging && "border-3"
      )}
    >
      <Icon className="size-6 text-primary" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}

export function SidebarButtonDragOverlay({ formElement }: SidebarButtonProps) {
  const { label, icon: Icon } = formElement.designerButtonElement;

  return (
    <Button variant="outline" className="h-24 flex flex-col gap-2 cursor-grab">
      <Icon className="size-6 text-primary" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}
