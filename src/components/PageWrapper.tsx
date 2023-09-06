import type { ReactNode } from "react";

export default function PageWrapper(props: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-light md:flex-row">
      {props.children}
    </div>
  );
}
