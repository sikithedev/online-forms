import { CheckboxFieldFormElement } from "../components/forms/fields/CheckboxField";
import { DateFieldFormElement } from "../components/forms/fields/DateField";
import { NumberFieldFormElement } from "../components/forms/fields/NumberField";
import { ParagraphFieldFormElement } from "../components/forms/fields/ParagraphField";
import { SelectFieldFormElement } from "../components/forms/fields/SelectField";
import { SeparatorFieldFormElement } from "../components/forms/fields/SeparatorField";
import { SpacerFieldFormElement } from "../components/forms/fields/SpacerField";
import { SubtitleFieldFormElement } from "../components/forms/fields/SubtitleField";
import { TextareaFieldFormElement } from "../components/forms/fields/TextareaField";
import { TextFieldFormElement } from "../components/forms/fields/TextField";
import { TitleFieldFormElement } from "../components/forms/fields/TitleField";

export type FormElementType =
  | "TextField"
  | "NumberField"
  | "TextareaField"
  | "DateField"
  | "SelectField"
  | "CheckboxField"
  | "TitleField"
  | "SubtitleField"
  | "ParagraphField"
  | "SeparatorField"
  | "SpacerField";
export type FormElementCategory = "input" | "layout";

export type SubmitHandler = (key: string, value: string) => void;

export type FormElement = {
  type: FormElementType;
  category: FormElementCategory;
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
    onSubmit?: SubmitHandler;
    defaultValue?: string;
    isInvalid?: boolean;
    className?: string;
    disabled?: boolean;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  validate: (element: FormElementInstance, currentValue: string) => boolean;
};

export type FormElementInstance = {
  id: string;
  type: FormElementType;
  additionalAttributes?: Record<string, any>;
};

type FormElements = Record<FormElementType, FormElement>;

export const formElements: FormElements = {
  TextField: TextFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextareaField: TextareaFieldFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
  CheckboxField: CheckboxFieldFormElement,
  TitleField: TitleFieldFormElement,
  SubtitleField: SubtitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
};

type FormElementsByCategory = Record<FormElementCategory, FormElementType[]>;

export const formElementsByCategory: FormElementsByCategory = {
  input: [
    "TextField",
    "NumberField",
    "TextareaField",
    "DateField",
    "SelectField",
    "CheckboxField",
  ],
  layout: [
    "TitleField",
    "SubtitleField",
    "ParagraphField",
    "SeparatorField",
    "SpacerField",
  ],
};
