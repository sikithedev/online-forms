import { TextFieldFormElement } from "./fields/TextField";

export type FormElementType = "TextField";

export type FormElement = {
  type: FormElementType;
  construct: (id: string) => FormElementInstance;
  designerButtonElement: {
    label: string;
    icon: React.ElementType;
  };
  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
};

export type FormElementInstance = {
  id: string;
  type: FormElementType;
  additionalAttributes?: Record<string, any>;
};

type FormElements = {
  [key in FormElementType]: FormElement;
};

export const formElements: FormElements = {
  TextField: TextFieldFormElement,
};
