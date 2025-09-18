import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-full flex grow justify-center items-center">
      <LoaderCircle className="animate-spin size-12" />
    </div>
  );
}
