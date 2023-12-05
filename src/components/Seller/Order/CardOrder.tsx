"use client";

import Image from "next/image";
import Link from "next/link";
import { MdOutlineArrowDropDown } from "react-icons/md";
const CardOrder = ({ data }: any) => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col lg:flex-row justify-between items-center w-[90%] lg:w-full border-2 rounded-3xl px-6 py-5 border-neutral-900 h-auto text-white">
        <Image
          src={data.image}
          alt="Picture of the author"
          width={64}
          height={64}
          className="aspect-square object-cover rounded-lg"
        />
        <div className="flex flex-row gap-5 lg:gap-0 my-1 lg:my-0 lg:flex-col justify-center text-neutral-300">
          <p className="text-[12px]">To</p>
          <p className="text-[16px]">@{data.customer}</p>
        </div>
        <div className="flex flex-row gap-5 lg:gap-0 my-1 lg:my-0 lg:flex-col justify-center text-neutral-300">
          <p className="text-[12px]">Title</p>
          <p className="text-[16px]">{data.title}</p>
        </div>
        <div className="flex flex-row gap-5 lg:gap-0 my-1 lg:my-0 lg:flex-col justify-center text-neutral-300">
          <p className="text-[12px]">Final bid price</p>
          <p className="text-[16px]">Rp. {data.highestBid}</p>
        </div>
        <div className="flex flex-row gap-5 lg:gap-0 my-1 lg:my-0 lg:flex-col justify-center text-neutral-300">
          <p className="text-[12px]">Ship to</p>
          <p className="text-[16px] text-neutral-900">
            {data.addressTo == ""
              ? "Order has not been checked out"
              : data.addressTo}
          </p>
        </div>
        <div>
          {data.status == "Need Confirmation" ? (
            <button className="flex gap-1 px-2 py-2 items-center bg-shade-100 rounded-xl text-[16px]">
              <p>Not paid</p>
            </button>
          ) : (
            <button className="flex gap-1 px-2 py-2 items-center bg-blue-500 rounded-xl text-[16px]">
              <p>{data.status == "Paid" ? "Paid" : "Paid"}</p>
              <MdOutlineArrowDropDown />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardOrder;
