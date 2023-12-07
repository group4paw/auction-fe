import Link from "next/link";
import type { Metadata } from "next";
import ListCollection from "@/components/Seller/Collection/ListCollection";

export const metadata: Metadata = {
  title: "Collection | Easybid",
  description: "...",
};

export default function CollectionPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center lg:justify-between lg:px-24 py-12">
      <div className="z-10 lg:max-w-4xl w-full  font-mono text-sm    ">
        <div className="flex lg:justify-end justify-center mb-10">
          <Link href="/sell/collection/add">
            <button className="py-2 px-5 bg-blue-500 text-neutral-100 rounded-xl text-xl">
              Add new art +
            </button>
          </Link>
        </div>
        <div className="items-center justify-center lg:justify-between flex flex-wrap gap-y-5">
          <ListCollection />
        </div>
      </div>
    </main>
  );
}
