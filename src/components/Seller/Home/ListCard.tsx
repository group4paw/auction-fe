"use client";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ListActive from "./ListActive";
import ListComing from "./ListComing";

export default function ListCard() {
  const [fetchStatus, setFetchStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({} as any);
  const [listActiveAuction, setListActiveAuction] = useState([] as any[]);
  const [listComingAuction, setListComingAuction] = useState([] as any[]);

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
    setListActiveAuction([]);
    setListComingAuction([]);
    setIsLoading(true);
    let dataTemp = [] as any[];
    try {
      await axios
        .get("https://auction-api-4.vercel.app/auction/" + userId)
        .then((res) => {
          dataTemp = res.data;
          console.log(dataTemp);
        });

      let dataActive = dataTemp.filter((item: any) => item.status == "live");
      let dataComing = dataTemp.filter(
        (item: any) => item.status == "coming-soon"
      );

      // sort data active by time left
      dataActive.sort((a: any, b: any) => {
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      });

      dataComing.sort((a: any, b: any) => {
        return (
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
      });

      setListActiveAuction(dataActive);
      setListComingAuction(dataComing);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!isLoading ? (
        <div className="w-full flex flex-col gap-10">
          <ListActive data={listActiveAuction} />
          <ListComing data={listComingAuction} />
        </div>
      ) : (
        <div className="w-screen flex justify-center items-center h-1/2">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-neutral-900"></div>
        </div>
      )}
    </>
  );
}
