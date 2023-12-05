"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";
import AuctionActivityComp from "../Auction/Activity";

export default function ActivityCard() {
  const [fetchStatus, setFetchStatus] = useState(false);
  const [listAuction, setListAuction] = useState([] as any[]);
  const [listActivity, setListActivity] = useState([] as any[]);
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({} as any);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      setFetchStatus(true);
    } else {
      setUser(JSON.parse(localStorage.getItem("user") || "{}"));
      let userId = JSON.parse(localStorage.getItem("user") || "{}")._id;
      if (!fetchStatus) {
        fetchData(userId);
        setFetchStatus(true);
      }
    }
  }, [fetchStatus]);

  const fetchData = async (userId: any) => {
    setIsLoading(true);
    setListActivity([]);
    let auction = [] as any[];
    let activity = [] as any[];
    try {
      await axios
        .get("https://auction-api-4.vercel.app/bid/user/" + userId)
        .then((res) => {
          let result = res.data;
          result.map((bid: any) => {
            auction.push(bid.auction);
            activity.push(bid._id);
          });
        });

      setListActivity(activity);
      setListAuction(auction);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!isLoading ? (
        listAuction.map((data, index) => {
          return (
            <div
              key={index}
              className="w-full flex lg:flex-row flex-col lg:gap-0 gap-3 justify-between items-center"
            >
              <Card auctionId={data} />
              <div className="lg:mr-8 mr-0 lg:w-auto w-full">
                <AuctionActivityComp auctionId={data} />
              </div>
            </div>
          );
        })
      ) : (
        <div className="w-full flex justify-center items-center h-1/2">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-neutral-900"></div>
        </div>
      )}
    </>
  );
}
