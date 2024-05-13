"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProgressBar color="#112b66" height="5px" options={{showSpinner: false}} shallowRouting />
      {children}
    </>
  );
}
