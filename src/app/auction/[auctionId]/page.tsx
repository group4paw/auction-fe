"use client";

import AuctionActivityComp from "@/components/Auction/Activity";
import AuctionCardDetail from "@/components/Auction/Card";
import AuctionDetailComp from "@/components/Auction/Details";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function AuctionDetail() {
  const [fetchStatus, setFetchStatus] = useState(false);
  const [dataAuction, setDataAuction] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    if (!fetchStatus) {
      fetchData();
      setFetchStatus(true);
    }
  }, [fetchStatus]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      await fetch(
        `https://auction-api-4.vercel.app/auction/${pathname.split("/")[2]}`
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setDataAuction(res[0]);
          setIsLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {!isLoading ? (
        <>
          <div className="px-28 mt-9">
            <div className="flex mb-14">
              <AuctionCardDetail data={dataAuction} />
              <AuctionActivityComp data={dataAuction} />
            </div>
            <AuctionDetailComp data={dataAuction} />
          </div>
        </>
      ) : (
        <div className="w-screen flex justify-center items-center h-1/2 my-5">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-neutral-900"></div>
        </div>
      )}
    </>
  );
}
