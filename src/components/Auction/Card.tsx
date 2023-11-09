import Image from "next/image";
import Bookmark from "@/assets/icons/bookmark.svg";

export default function AuctionCardDetail() {
  return (
    <div className="w-2/3 flex rounded-2xl overflow-hidden font-sarala">
      <Image
        src="https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?q=80&w=2790&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        width={320}
        height={424}
      />
      <div className="flex grow bg-neutral-900 p-6 flex-col justify-between">
        <div className="flex-col">
          <div className="flex flex-row justify-between">
            <div className="flex gap-2 items-center">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width={32}
                height={32}
                alt=""
                className="rounded-full object-cover aspect-square"
              />
              <div className="font-sarala text-neutral-300">
                <p className="text-[9px]">Artist</p>
                <p className="text-[14px]">@alexandriadaivanci</p>
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
            Profiles of Generosity
          </h6>
          <p className="text-[14px] text-neutral-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit,
            harum aperiam ipsa nostrum, quis necessitatibus suscipit assumenda,
            voluptate placeat fugit quasi. Amet, assumenda tenetur iusto odit ut
            explicabo unde ipsam?
          </p>
        </div>
        <div className="flex-col">
          <div className="flex justify-between">
            <div>
              <p className="text-[14px] text-neutral-500">Highest bid</p>
              <p className="text-[20px] text-neutral-100">Rp. 325.998.000</p>
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
