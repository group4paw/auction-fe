"use client";

import EditArtComp from "@/components/Seller/Collection/EditArt";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { usePathname, useSearchParams } from "next/navigation";
import axios from "axios";

const EditArt = () => {
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
              pathname.split("/")[4]
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
      <main className="flex min-h-screen flex-col items-center justify-center lg:justify-between lg:px-24 py-12">
        <div className="z-10 lg:max-w-4xl w-full  font-mono text-sm    ">
          <div className="flex justify-start mb-5">
            <Link href="/sell/collection">
              <button className="py-2 px-4 text-neutral-100 rounded-xl text-xl flex items-center gap-3 font-bold">
                <MdArrowBack />
                <p>Edit art</p>
              </button>
            </Link>
          </div>
          <div className="items-center justify-center lg:justify-center flex flex-wrap">
            <EditArtComp data={dataPainting} />
          </div>
        </div>
      </main>
    </>
  );
};

export default EditArt;
