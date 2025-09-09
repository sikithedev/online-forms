import CreateFormButton from "@/components/CreateFormButton";
import FormCards from "@/components/FormCards";
import StatsCards from "@/components/StatsCards";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="container mx-auto space-y-4">
      <StatsCards />
      <Separator />
      <h2 className="text-3xl font-bold">Your forms</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <CreateFormButton />
        <FormCards />
      </div>
    </div>
  );
}
