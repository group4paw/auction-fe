import Image from "next/image";
import Bookmark from "@/assets/icons/bookmark.svg";
import Timer from "../Timer";

export default function AuctionCardDetail({ data }: any) {
  return (
    <div className="w-full lg:w-[80%] flex flex-col lg:flex-row rounded-xl lg:rounded-2xl overflow-hidden font-sarala mb-10 lg:mb-0">
      <Image
        src={data.idPainting?.image || ""}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "40%", height: "100%" }} // optional
        className="lg:block hidden"
      />
      <Image
        src={data.idPainting?.image || ""}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "100%" }} // optional
        className="lg:hidden block"
      />
      <div className="flex bg-neutral-900 p-6 flex-col justify-between">
        <div className="flex-col lg:mb-10">
          <div className="flex flex-row justify-between">
            <div className="flex gap-2 items-center">
              <Image
                src={data.owner?.image}
                width={0}
                height={0}
                sizes="100vw"
                alt=""
                className="rounded-full object-cover aspect-square"
                style={{ width: "15%", height: "100%" }} // optional
              />
              <div className="font-sarala text-neutral-300">
                <p className="lg:text-[9px] text-[14px]">Artist</p>
                <p className="lg:text-[14px] text-[18px]">
                  @{data.owner?.name}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center bg-neutral-700 rounded-full w-[42px] h-[42px] aspect-square cursor-pointer">
              <Image
                src={Bookmark}
                width={24}
                height={24}
                alt=""
                className="rounded-full object-cover aspect-square"
              />
            </div>
          </div>
          <h6 className="text-[28px] text-neutral-100 my-5 font-bold">
            {data.idPainting?.title}
          </h6>
          <p className="text-justify lg:text-left text-[14px] text-neutral-500 mb-10 lg:mb-0 ">
            {data.idPainting?.description}
          </p>
        </div>
        <div className="flex-col">
          <div className="flex justify-between">
            <div>
              <p className="text-[14px] text-neutral-500">Highest bid</p>
              <p className="text-[20px] text-neutral-100">{data.highestBid}</p>
            </div>
            <div>
              <p className="text-[14px] text-neutral-500">Auction Ends In</p>
              <p className="text-[20px] text-neutral-100">
                <Timer timer={data.timeLeft} />
              </p>
            </div>
          </div>
          <button className="w-full bg-blue-500 py-2 text-neutral-100 rounded-xl mt-2">
            Place a bid
          </button>
        </div>
      </div>
    </div>
  );
}
