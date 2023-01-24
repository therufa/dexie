import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="container mx-auto">
      <div className="">{children}</div>
    </div>
  );
}