"use client";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { useSelector } from "react-redux";

export default function ListCard() {
  const [fetchStatus, setFetchStatus] = useState(false);
  const [listAuction, setListAuction] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navbar = useSelector((state: any) => state.navbar.value);

  useEffect(() => {
    if (!fetchStatus) {
      fetchData(navbar);
      setFetchStatus(true);
    }
  }, []);

  useEffect(() => {
    if (navbar != "") fetchData(navbar);
  }, [navbar]);

  const fetchData = async (navbar: any) => {
    setIsLoading(true);
    setListAuction([]);
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
            console.log("navbar", data);
            setListAuction(data);
            setIsLoading(false);
          } else {
            console.log("no nav", res.data);
            setListAuction(res.data);
            setIsLoading(false);
          }
        });
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
