import Checkout from "@/components/Buy/Order/Checkout";
import type { Metadata } from "next";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

export const metadata: Metadata = {
  title: "Checkout | Easybid",
  description: "...",
};

export default function CheckOut() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center lg:justify-between lg:px-24 py-12 font-sarala">
        <div className="z-10 lg:max-w-5xl w-full  font-mono text-sm    ">
          <div className="flex justify-start mb-5">
            <Link href="/buy/order/">
              <button className="py-2 px-4 text-neutral-100 rounded-xl text-xl flex items-center gap-3 font-bold">
                <MdArrowBack />
                <p>Checkout</p>
              </button>
            </Link>
          </div>
          <div className="items-center justify-center lg:justify-center flex flex-wrap">
            <Checkout />
          </div>
        </div>
      </main>
    </>
  );
}
