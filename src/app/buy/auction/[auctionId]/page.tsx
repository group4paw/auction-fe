"use client";

import AuctionActivityComp from "@/components/Buy/Auction/Activity";
import AuctionCardDetail from "@/components/Buy/Auction/Card";
import AuctionDetailComp from "@/components/Buy/Auction/Details";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NotFoundPage from "@/app/not-found";

export default function AuctionDetail() {
  const [fetchStatus, setFetchStatus] = useState(false);
  const [dataAuction, setDataAuction] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (fetchStatus) return;

    // fetch data
    (async () => {
      setIsLoading(true);
      try {
        await fetch(`https://auction-api-4.vercel.app/auction/${pathname.split("/")[3]}`)
          .then((res) => res.json())
          .then((res) => {
            setDataAuction(res[0]);
            setIsLoading(false);
          });
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    })();
    setFetchStatus(true);
  }, [fetchStatus, pathname]);

  return (
    <>
      {!isLoading ? (
        <>
          {dataAuction.length != 0 ? (
            <div className="px-5 lg:px-28 mt-9">
              <div className="flex lg:flex-row flex-col mb-14">
                <AuctionCardDetail data={dataAuction} />
                <AuctionActivityComp data={dataAuction} />
              </div>
              <AuctionDetailComp data={dataAuction} />
            </div>
          ) : (
            NotFoundPage()
          )}
        </>
      ) : (
        <div className="w-screen flex justify-center items-center h-1/2 my-5">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-neutral-900"></div>
        </div>
      )}
    </>
  );
}
