import Refresh from "@/assets/icons/refresh.svg";
import Image from "next/image";

export default function AuctionActivityComp({ data }: any) {
  return (
    <div className="flex-col ml-0 lg:ml-8">
      <div className="flex grow  justify-between items-start mb-4">
        <p className="text-[16px] font-bold text-white">Activity</p>
        <Image src={Refresh} alt="refresh" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <Image
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            width={32}
            height={32}
            alt=""
            className="rounded-full object-cover aspect-square"
          />
          <div className="flex flex-col text-[14px]">
            <p className="text-neutral-100">
              @leonelcikoko outbid @gynosiatu with a bid of Rp 325.998.000{" "}
            </p>
            <p className="text-neutral-500">October 12, 2023 | 09:24 </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Image
            src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            width={32}
            height={32}
            alt=""
            className="rounded-full object-cover aspect-square"
          />
          <div className="flex flex-col text-[14px]">
            <p className="text-neutral-100">
              @gynosiatu outbid @axeliavonti with a bid of Rp 320.455.000
            </p>
            <p className="text-neutral-500">October 12, 2023 | 09:24</p>
          </div>
        </div>
      </div>
    </div>
  );
}
