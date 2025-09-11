"use client";

import { createContext, ReactNode, useState } from "react";
import { FormElementInstance } from "../FormElements";

type DesignerContext = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
};

export const DesignerContext = createContext<DesignerContext | null>(null);

export default function DesignerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  function addElement(index: number, element: FormElementInstance) {
    setElements((prev) => [
      ...prev.slice(0, index),
      element,
      ...prev.slice(index),
    ]);
  }

  return (
    <DesignerContext.Provider value={{ elements, addElement }}>
      {children}
    </DesignerContext.Provider>
  );
}
