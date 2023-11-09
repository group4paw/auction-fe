import type { Metadata } from "next";
import ListCard from "@/components/Home/ListCard";
import { useSelector } from "react-redux";

export const metadata: Metadata = {
  title: "Home | Easybid",
  description: "...",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 py-12">
      <div className="z-10 max-w-5xl w-full items-center justify-start gap-8 font-mono text-sm lg:flex flex-wrap">
        <ListCard />
      </div>
    </main>
  );
}
