import { FileStack } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="font-bold inline-flex items-center justify-center gap-2"
    >
      <FileStack size={20} /> OnlineForms
    </Link>
  );
}
