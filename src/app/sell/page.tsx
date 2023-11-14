import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Easybid",
  description: "...",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center lg:justify-between lg:px-24 py-12">
      <div className="z-10 lg:max-w-5xl w-full items-center justify-center lg:justify-start gap-4 font-mono text-sm flex flex-wrap"></div>
    </main>
  );
}
