import ListActivity from "@/components/Buy/Activity/ListActivity";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bid Activity | Easybid",
  description: "...",
};

export default function Activity() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-start lg:justify-between lg:px-24 py-12">
        <div className="z-10 lg:max-w-3xl w-[90%] items-center justify-center lg:justify-start gap-4 font-sarala text-sm flex flex-col flex-wrap">
          <div className="flex justify-start w-full">
            <h6 className="text-[24px] text-white font-bold">
              Watch your bid activity
            </h6>
          </div>
          <ListActivity />
        </div>
      </main>
    </>
  );
}
