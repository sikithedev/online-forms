import React from "react";
import { formElements } from "./FormElements";
import SidebarButton from "./SidebarButton";

export default function FormElementsSidebar() {
  return (
    <div>
      <span>Elements</span>
      <div className="grid grid-cols-2 gap-2">
        {Object.values(formElements).map((element) => (
          <SidebarButton
            key={element.type}
            formElement={element}
          ></SidebarButton>
        ))}
      </div>
    </div>
  );
}
