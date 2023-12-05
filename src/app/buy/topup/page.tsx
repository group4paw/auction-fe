import TopupComponent from "@/components/Buy/Topup/Topup";
import { MdArrowBack } from "react-icons/md";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Up | Easybid",
  description: "...",
};

export default function TopUp() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-start lg:justify-between lg:px-24 py-12">
        <div className="z-10 lg:max-w-xl w-[90%] items-center justify-center lg:justify-start gap-4 font-sarala text-sm flex flex-col flex-wrap">
          <div className="flex justify-start w-full gap-2 items-center">
            <MdArrowBack className="text-white text-[24px]" />
            <h6 className="text-[24px] text-white font-bold">Top up</h6>
          </div>
          <TopupComponent />
        </div>
      </main>
    </>
  );
}
