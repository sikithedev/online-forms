import React from "react";
import { formElements } from "./forms/formElements";
import SidebarButton from "./SidebarButton";
import useDesigner from "@/hooks/useDesigner";
import FormElementsSidebar from "./FormElementsSidebar";
import PropertiesSidebar from "./PropertiesSidebar";

export default function DesignerSidebar() {
  const { selectedElement } = useDesigner();

  return (
    <aside className="h-full w-96 p-2 flex flex-col grow gap-2 border-l border-muted bg-background overflow-y-auto">
      {selectedElement ? <PropertiesSidebar /> : <FormElementsSidebar />}
    </aside>
  );
}
