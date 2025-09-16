import useDesigner from "@/hooks/useDesigner";
import React from "react";
import { formElements } from "./forms/formElements";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export default function PropertiesSidebar() {
  const { selectedElement, setSelectedElement } = useDesigner();

  if (!selectedElement) return null;

  const PropertiesForm =
    formElements[selectedElement?.type].propertiesComponent;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">Element properties</p>
        <Button
          variant="ghost"
          onClick={() => setSelectedElement(null)}
          className="!p-0 h-fit"
        >
          <X />
        </Button>
      </div>
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
}
