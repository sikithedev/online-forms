import React from "react";
import useDesigner from "@/hooks/useDesigner";
import FormElementsSidebar from "./FormElementsSidebar";
import PropertiesSidebar from "./PropertiesSidebar";

export default function DesignerSidebar() {
  const { selectedElement } = useDesigner();

  return (
    <div className="w-80 h-full p-4 border-l border-muted bg-background overflow-y-auto">
      {selectedElement ? <PropertiesSidebar /> : <FormElementsSidebar />}
    </div>
  );
}
