"use client";

import Refresh from "@/assets/icons/refresh.svg";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function AuctionActivityComp({ auctionId }: any) {
  const [bidActivity, setBidActivity] = useState([]) as any[];
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (!status) {
      fetchActivity();
    }
  });

  const fetchActivity = async () => {
    setIsLoading(true);
    setBidActivity([]);
    try {
      await fetch(`https://auction-api-4.vercel.app/bid/${auctionId}`)
        .then((res) => res.json())
        .then((res) => {
          console;
          res.map((bid: any) => {
            let date = new Date(bid.bidDate);
            bid.bidDate = date.toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            });
            bid.bidDate = bid.bidDate.replace("at", "|");
          });
          setBidActivity(res);
          setIsLoading(false);
        });
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
    setStatus(true);
  };

  return (
    <div className="w-full flex-col ml-0 lg:ml-8">
      <div className="flex grow  justify-between items-start mb-4">
        <p className="text-[16px] font-bold text-white">Activity</p>
        <Image src={Refresh} alt="refresh" width={20} height={20} />
      </div>
      {bidActivity.length != 0 ? (
        <div className="flex flex-col gap-4 w-auto lg:w-full">
          {bidActivity.map((bid: any, index: number) => (
            <div key={index} className="flex items-start gap-3">
              <Image
                src={bid.bidder.image}
                width={32}
                height={32}
                alt=""
                className="rounded-full object-cover aspect-square"
              />
              <div className="flex flex-col text-[14px]">
                {bid[index + 1] ? (
                  <p className="text-neutral-100">
                    @{bid.bidder.username} outbid @
                    {bid[index + 1].bidder.username} with a bid of Rp{" "}
                    {bid.amount}
                  </p>
                ) : (
                  <p className="text-neutral-100 ">
                    <span className="font-bold">@{bid.bidder.username}</span>{" "}
                    bid Rp <span className="font-bold">{bid.amount}</span>
                  </p>
                )}
                <p className="text-neutral-500">{bid.bidDate}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="font-sarala flex justify-start items-center">
          <p className="text-sm text-white">
            There is no activity yet, be the first one to bid!
          </p>
        </div>
      )}
    </div>
  );
}
