"use client";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { useSelector } from "react-redux";

export default function ListCard() {
  const [fetchStatus, setFetchStatus] = useState(false);
  const [listAuction, setListAuction] = useState([] as any[]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({} as any);

  const navbar = useSelector((state: any) => state.navbar.value);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      setFetchStatus(true);
    } else {
      setUser(JSON.parse(localStorage.getItem("user") || "{}"));
      let userId = JSON.parse(localStorage.getItem("user") || "{}")._id;
      if (!fetchStatus) {
        fetchData(navbar, userId);
        setFetchStatus(true);
      }
    }
  }, [fetchStatus, navbar]);

  useEffect(() => {
    let userId = JSON.parse(localStorage.getItem("user") || "{}")._id;
    if (navbar != "") fetchData(navbar, userId);
  }, [navbar, user]);

  const fetchData = async (navbar: any, userId: any) => {
    setListAuction([]);
    setIsLoading(true);
    let dataTemp = [] as any[];
    let wishlist = [] as any[];
    try {
      await axios
        .get("https://auction-api-4.vercel.app/auction/")
        .then((res) => {
          if (navbar != "") {
            let data = res.data;
            if (navbar == "live-auction") {
              data = data.filter((item: any) => item.status == "live");
            } else if (navbar == "coming-soon") {
              data = data.filter((item: any) => item.status == "coming-soon");
            }
            dataTemp = data;
          } else {
            dataTemp = res.data;
          }
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

      setListAuction(dataTemp);
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
            <div key={index}>
              <Card data={data} />;
            </div>
          );
        })
      ) : (
        <div className="w-screen flex justify-center items-center h-1/2">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-neutral-900"></div>
        </div>
      )}
    </>
  );
}
