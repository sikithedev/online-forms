import React from "react";
import { formElements } from "./FormElements";
import SidebarButton from "./SidebarButton";

export default function DesignerSidebar() {
  return (
    <aside className="h-full w-96 p-2 flex flex-col grow gap-2 border-l border-muted bg-background overflow-y-auto">
      <span>Elements</span>
      <div className="grid grid-cols-2 gap-2">
        {Object.values(formElements).map((element) => (
          <SidebarButton
            key={element.type}
            formElement={element}
          ></SidebarButton>
        ))}
      </div>
    </aside>
  );
}
