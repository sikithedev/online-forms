import React from "react";
import { formElements } from "./forms/formElements";
import SidebarButton from "./SidebarButton";

export default function FormElementsSidebar() {
  return (
    <div>
      <p className="text-sm text-muted-foreground">Drag and drop elements</p>
      <p className="text-md text-muted-foreground">Layout elements</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {Object.values(formElements)
          .filter((element) => element.category === "layout")
          .map((element) => (
            <SidebarButton key={element.type} formElement={element} />
          ))}
      </div>
      <p className="text-md text-muted-foreground">Input elements</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {Object.values(formElements)
          .filter((element) => element.category === "input")
          .map((element) => (
            <SidebarButton key={element.type} formElement={element} />
          ))}
      </div>
    </div>
  );
}
