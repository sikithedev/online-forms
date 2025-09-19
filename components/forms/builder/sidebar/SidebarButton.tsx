import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormElement } from "@/types/formElements";
import { useDraggable } from "@dnd-kit/core";

type SidebarButtonProps = {
  formElement: FormElement;
};

export default function SidebarButton({ formElement }: SidebarButtonProps) {
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
        "w-full flex justify-between cursor-grab",
        isDragging && "border-3"
      )}
    >
      <SidebarButtonContent formElement={formElement} />
    </Button>
  );
}

export function SidebarButtonDragOverlay({ formElement }: SidebarButtonProps) {
  return (
    <Button
      variant="outline"
      className="w-full flex justify-between cursor-grabbing"
    >
      <SidebarButtonContent formElement={formElement} />
    </Button>
  );
}

function SidebarButtonContent({ formElement }: SidebarButtonProps) {
  const { label, icon: Icon } = formElement.designerButtonElement;
  return (
    <>
      <span className="text-sm">{label}</span>
      <Icon className="!size-4 text-muted-foreground" />
    </>
  );
}
