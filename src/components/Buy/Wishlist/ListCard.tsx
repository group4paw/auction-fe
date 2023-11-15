"use client";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Card from "@/components/Buy/Home/Card";
import { useSelector } from "react-redux";

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
  }, []);

  const fetchData = async (userId: any) => {
    setIsLoading(true);
    setListAuction([]);
    let dataTemp = [] as any[];
    let wishlist = [] as any[];
    try {
      await axios
        .get("https://auction-api-4.vercel.app/auction/")
        .then((res) => {
          dataTemp = res.data;
        });

      await axios
        .get("https://auction-api-4.vercel.app/wishlist/" + userId)
        .then((res) => {
          wishlist = res.data;
        });

      dataTemp.forEach((item: any) => {
        let isWishlist = false;
        wishlist.forEach((wish: any) => {
          if (item._id == wish.idAuction) {
            isWishlist = true;
          }
        });
        item.isWishlist = isWishlist;
      });

      dataTemp = dataTemp.filter((item: any) => item.isWishlist == true);

      setListAuction(dataTemp);

      setIsLoading(false);
    } catch (err) {
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
