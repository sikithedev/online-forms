"use client";

import React from "react";
import DesignerSidebar from "./DesignerSidebar";
import { useDroppable } from "@dnd-kit/core";

export default function Designer() {
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  return (
    <div className="w-full h-full flex">
      <div className="w-full p-4">
        <div className="max-w-[920px] h-full m-auto bg-background rounded-xl flex flex-col flex-1 justify-start items-center overflow-y-auto">
          <p className="flex grow items-center font-bold text-xl text-muted-foreground">
            Drop here
          </p>
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}
