"use client";

import AuctionActivityComp from "@/components/Buy/Auction/Activity";
import AuctionCardDetail from "@/components/Buy/Auction/Card";
import AuctionDetailComp from "@/components/Buy/Auction/Details";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NotFoundPage from "@/app/not-found";
import axios from "axios";

export default function AuctionPage() {
  const [fetchStatus, setFetchStatus] = useState(false);
  const [dataAuction, setDataAuction] = useState({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (fetchStatus) return;

    // fetch data
    (async () => {
      setIsLoading(true);
      try {
        await axios
          .get(
            `https://auction-api-4.vercel.app/auction/${pathname.split("/")[3]}`
          )
          .then((res) => {
            setDataAuction(res.data[0]);
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
          {dataAuction ? (
            <div className="w-full px-5 lg:px-28 mt-9">
              <div className="flex lg:flex-row flex-col mb-14">
                <div className="w-auto lg:w-[70%]">
                  <AuctionCardDetail data={dataAuction} />
                  <AuctionDetailComp data={dataAuction} />
                </div>
                <div className="w-auto w-[30%]">
                  <AuctionActivityComp auctionId={dataAuction._id} />
                </div>
              </div>
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
