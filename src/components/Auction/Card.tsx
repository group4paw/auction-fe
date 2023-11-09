import Image from "next/image";
import Bookmark from "@/assets/icons/bookmark.svg";
import { useSelector } from "react-redux";

export default function AuctionCardDetail({ data }: any) {
  return (
    <div className="w-2/3 flex rounded-2xl overflow-hidden font-sarala">
      <Image
        src={data.idPainting?.image || ""}
        alt=""
        width={320}
        height={424}
      />
      <div className="flex grow bg-neutral-900 p-6 flex-col justify-between">
        <div className="flex-col">
          <div className="flex flex-row justify-between">
            <div className="flex gap-2 items-center">
              <Image
                src={data.owner?.image}
                width={32}
                height={32}
                alt=""
                className="rounded-full object-cover aspect-square"
              />
              <div className="font-sarala text-neutral-300">
                <p className="text-[9px]">Artist</p>
                <p className="text-[14px]">@{data.owner?.name}</p>
              </div>
            </div>
            <div className="flex gap-2 items-center justify-center bg-neutral-700 rounded-full w-[42px] aspect-square cursor-pointer">
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
          <p className="text-[14px] text-neutral-500">
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
              <p className="text-[20px] text-neutral-100">12 : 08 : 25</p>
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
