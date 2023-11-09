import Image from "next/image";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Easybid",
  description: "...",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="font-sarala font-bold">abcdefghi</h1>
      </div>
    </main>
  );
}
