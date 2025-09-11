"use client";

import { DesignerContext } from "@/components/contexts/DesignerContext";
import { useContext } from "react";

export default function useDesigner() {
  const context = useContext(DesignerContext);

  if (!context) {
    throw new Error("useDesigner must be used within DesignerContext");
  }

  return context;
}
