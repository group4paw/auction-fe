import ListOrderComp from "@/components/Buy/Order/Order";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Status | Easybid",
  description: "...",
};

export default function Activity() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center lg:justify-between lg:px-24 py-12">
        <div className="z-10 lg:max-w-4xl w-full items-center justify-center lg:justify-start gap-10 font-sarala text-sm flex flex-col flex-wrap">
          <ListOrderComp />
        </div>
      </main>
    </>
  );
}
