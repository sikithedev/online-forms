import SidebarButton from "@/components/forms/builder/sidebar/SidebarButton";
import { formElements } from "@/types/formElements";

export default function FormElementsSidebar() {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">Drag and drop elements</p>
      <div className="space-y-2">
        <p className="text-sm leading-none">Layout elements</p>

        {Object.values(formElements)
          .filter((element) => element.category === "layout")
          .map((element) => (
            <SidebarButton key={element.type} formElement={element} />
          ))}
      </div>

      <div className="space-y-2">
        <p className="text-sm leading-none">Input elements</p>
        {Object.values(formElements)
          .filter((element) => element.category === "input")
          .map((element) => (
            <SidebarButton key={element.type} formElement={element} />
          ))}
      </div>
    </div>
  );
}
