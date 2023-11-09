import Image from "next/image";
import PreviewCard from "@/components/PreviewCard"; 
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Easybid",
  description: "...",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <PreviewCard/>
		<PreviewCard/>
		<PreviewCard/>
      </div>
    </main>
  );
}
