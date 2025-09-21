import { getForms, getFormStats } from "@/actions/forms";
import FormCards from "@/components/forms/dashboard/FormCards";
import StatsCards from "@/components/forms/dashboard/StatsCards";
import CreateFormButton from "@/components/forms/ui/CreateFormButton";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  const { visits, submissions } = await getFormStats();
  const forms = await getForms();

  const formLimit = 10;

  return (
    <div className="container mx-auto space-y-4 px-4">
      <StatsCards visits={visits} submissions={submissions} allForms />
      <Separator />
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold tracking-tight">
          Your forms{" "}
          <span className="text-muted-foreground text-xl">
            ({forms.length}/{formLimit})
          </span>
        </h2>
        <CreateFormButton
          formLimit={formLimit}
          disabled={forms.length >= formLimit}
        />
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <FormCards forms={forms} />
      </div>
    </div>
  );
}
