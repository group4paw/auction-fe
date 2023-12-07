import AddEventComp from "@/components/Seller/Event/AddEvent";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Event | Easybid",
  description: "...",
};

const AddEvent = () => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center lg:justify-between lg:px-24 py-12 font-sarala">
        <div className="z-10 lg:max-w-4xl w-[90%]  font-mono text-sm    ">
          <div className="flex justify-start mb-5">
            <Link href="/sell">
              <button className="py-2 px-4 text-neutral-100 rounded-xl text-xl flex items-center gap-3 font-bold">
                <MdArrowBack />
                <p>Add new event</p>
              </button>
            </Link>
          </div>
          <div className="items-center justify-center lg:justify-center flex flex-wrap">
            <AddEventComp />
          </div>
        </div>
      </main>
    </>
  );
};

export default AddEvent;
