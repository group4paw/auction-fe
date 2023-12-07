"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "@/components/Buy/Home/Card";
import { useSelector } from "react-redux";
import CardArt from "./Card";

export default function TrendingArts() {
  const [fetchStatus, setFetchStatus] = useState(false);
  const [listAuction, setListAuction] = useState([] as any[]);
  const [isLoading, setIsLoading] = useState(false);
  const [countOver, setCountOver] = useState(0);

  const navbar = useSelector((state: any) => state.navbar.value);

  useEffect(() => {
    if (!fetchStatus) {
      fetchData();
      setFetchStatus(true);
    }
  }, [fetchStatus]);

  const fetchData = async () => {
    setListAuction([]);
    setIsLoading(true);
    let dataTemp = [] as any[];
    try {
      await axios
        .get("https://auction-api-4.vercel.app/auction/user/")
        .then((res) => {
          dataTemp = res.data;
        });

      // sort data by status
      dataTemp.sort((a: any, b: any) => {
        if (a.status == "live" && b.status == "coming-soon") return -1;
        else if (a.status == "coming-soon" && b.status == "live") return 1;
        else return 0;
      });

      // sort again by timeleft
      dataTemp.sort((a: any, b: any) => {
        if (a.status == "live" && b.status == "live") {
          if (a.timeLeft < b.timeLeft) return -1;
          else if (a.timeLeft > b.timeLeft) return 1;
          else return 0;
        } else return 0;
      });

      dataTemp = dataTemp.slice(0, 4);

      setListAuction(dataTemp);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="px-5 pt-3 sm:px-6 lg:px-20 lg:pt-8 bg-opacity-70 2xl:px-32 font-sarala font-bold my-10 lg:my-20">
      <p className="text-white text-[24px]">Trending Arts</p>
      {!isLoading ? (
        listAuction.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-5 justify-start items-center mt-5">
            {listAuction.map((data: any) => {
              return <CardArt data={data} key={data.id} />;
            })}
          </div>
        ) : (
          <div className="w-screen flex justify-center items-center h-1/2">
            <p className="text-white text-[24px]">No trending arts</p>
          </div>
        )
      ) : (
        <div className="w-screen flex justify-center items-center h-1/2">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-neutral-900"></div>
        </div>
      )}
    </div>
  );
}
