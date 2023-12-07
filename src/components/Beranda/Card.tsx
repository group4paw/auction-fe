import Image from "next/image";
import Link from "next/link";

export default function CardArt({ data }: any) {
  return (
    <div className="relative flex flex-col rounded-2xl w-72 h-auto bg-neutral-900 bg-opacity-50 p-4 font-sarala">
      <Image
        src={data.idPainting?.image}
        alt=""
        width={340}
        height={384}
        className="rounded-lg h-[14.5rem] object-cover cursor-pointer select-none"
      />
      <div className="flex flex-col">
        <p className="text-neutral-500 font-sarala font-bold text-xl my-4 overflow-hidden truncate cursor-pointer select-none">
          {data.title}
        </p>
      </div>
      <div className="flex flex-row justify-between">
        <div className="w-1/2">
          <p className="text[12px] text-neutral-500">Highest bid</p>
          <p className="text[14px] text-neutral-100 font-normal">
            Rp. {data.highestBid}
          </p>
        </div>
        <div className="w-1/2  flex items-center">
          <button className="w-full h-auto py-2 bg-blue-500 text-neutral-100 text-[16px] rounded-2xl">
            Place bid
          </button>
        </div>
      </div>
    </div>
  );
}
