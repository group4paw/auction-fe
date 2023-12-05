"use client";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Card from "@/components/Buy/Home/Card";

export default function ListCard() {
  const [fetchStatus, setFetchStatus] = useState(false);
  const [listAuction, setListAuction] = useState([] as any[]);
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = React.useState({} as any);

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
    setListAuction([]);
    let auctions = [] as any[];
    let wishlist = [] as any[];
    try {
      await axios
        .get("https://auction-api-4.vercel.app/auction/")
        .then((res) => {
          auctions = res.data;
        });

      await axios
        .get("https://auction-api-4.vercel.app/wishlist/" + userId)
        .then((res) => {
          wishlist = res.data;
        });

      wishlist = wishlist.map((item) => item.idAuction);
      auctions = auctions.filter((auction) => wishlist.includes(auction._id));

      setListAuction(auctions);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);

      console.log(err);
    }
  };

  return (
    <>
      {!isLoading ? (
        listAuction.length > 0 ? (
          listAuction.map((data, index) => {
            return (
              <div key={index}>
                <Card data={data} />;
              </div>
            );
          })
        ) : (
          <div className="w-screen flex justify-center items-center h-1/2">
            <p className="text-2xl text-neutral-700">
              You dont have any wishlist
            </p>
          </div>
        )
      ) : (
        <div className="w-screen flex justify-center items-center h-1/2">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-neutral-900"></div>
        </div>
      )}
    </>
  );
}
