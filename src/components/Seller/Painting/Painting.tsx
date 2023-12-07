"use client";

import AuctionActivityComp from "@/components/Buy/Auction/Activity";
import AuctionCardDetail from "@/components/Buy/Auction/Card";
import AuctionDetailComp from "@/components/Buy/Auction/Details";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NotFoundPage from "@/app/not-found";
import axios from "axios";
import PaintingCardDetail from "@/components/Seller/Collection/DetailPaintingCard";
import { MdArrowBack } from "react-icons/md";
import Link from "next/link";

export default function PaintingDetail() {
  const [fetchStatus, setFetchStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const [dataPainting, setDataPainting] = useState({} as any);

  useEffect(() => {
    if (fetchStatus) return;

    // fetch data
    (async () => {
      setIsLoading(true);
      try {
        await axios
          .get(
            `https://auction-api-4.vercel.app/painting/${
              pathname.split("/")[3]
            }`
          )
          .then((res) => {
            let imageUrl = res.data.painting.image || "";
            if (!imageUrl.includes("https://")) {
              imageUrl = "https://auction-api-4.vercel.app/images/" + imageUrl;
            }
            res.data.painting.image = imageUrl;
            setDataPainting(res.data.painting);
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
          {dataPainting.length != 0 ? (
            <div className="w-full px-5 lg:px-28 mt-9">
              <div className="flex lg:flex-row flex-col mb-14">
                <div className="w-auto lg:w-[70%] mx-auto flex items-start  gap-3">
                  <Link
                    href={`/sell/collection/`}
                    className="bg-neutral-900 w-[32px] aspect-square flex justify-center items-center rounded-lg"
                  >
                    <MdArrowBack className="text-neutral-100 text-2xl" />
                  </Link>
                  <PaintingCardDetail data={dataPainting} />
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
