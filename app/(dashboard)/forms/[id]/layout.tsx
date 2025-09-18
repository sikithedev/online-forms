import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="w-full flex flex-col grow mx-auto">{children}</div>;
}
