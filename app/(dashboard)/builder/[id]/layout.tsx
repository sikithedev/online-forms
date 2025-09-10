import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="w-full flex grow mx-auto">{children}</div>;
}
