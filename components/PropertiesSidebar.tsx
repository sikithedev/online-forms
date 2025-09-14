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
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Element properties</p>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSelectedElement(null)}
        >
          <X />
        </Button>
      </div>
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
}
