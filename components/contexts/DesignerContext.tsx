"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { FormElementInstance } from "../forms/formElements";

export type DesignerContext = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
  setElements: Dispatch<SetStateAction<FormElementInstance[]>>;
  updateElement: (id: string, element: FormElementInstance) => void;
  removeElement: (id: string) => void;
  selectedElement: FormElementInstance | null;
  setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;
};

export const DesignerContext = createContext<DesignerContext | null>(null);

export default function DesignerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const [selectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null);

  function addElement(index: number, element: FormElementInstance) {
    setElements((prev) => [
      ...prev.slice(0, index),
      element,
      ...prev.slice(index),
    ]);
  }

  function updateElement(id: string, element: FormElementInstance) {
    setElements((prev) => {
      const index = prev.findIndex((el) => el.id === id);
      return [...prev.slice(0, index), element, ...prev.slice(index + 1)];
    });
  }

  function removeElement(id: string) {
    setElements((prev) => prev.filter((element) => element.id !== id));
  }

  return (
    <DesignerContext.Provider
      value={{
        elements,
        addElement,
        setElements,
        updateElement,
        removeElement,
        selectedElement,
        setSelectedElement,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
