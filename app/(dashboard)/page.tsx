import CreateFormButton from "@/components/CreateFormButton";
import StatsCards from "@/components/StatsCards";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="container mx-auto">
      <StatsCards />
      <Separator className="my-4" />
      <h2 className="text-4xl font-bold">Your forms</h2>
      <CreateFormButton />
    </div>
  );
}
