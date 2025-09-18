import FormElementsSidebar from "@/components/forms/builder/sidebar/FormElementsSidebar";
import PropertiesSidebar from "@/components/forms/builder/sidebar/PropertiesSidebar";
import useDesigner from "@/hooks/useDesigner";

export default function DesignerSidebar() {
  const { selectedElement } = useDesigner();

  return (
    <div className="w-80 h-full p-4 border-l border-muted bg-background overflow-y-auto">
      {selectedElement ? <PropertiesSidebar /> : <FormElementsSidebar />}
    </div>
  );
}
