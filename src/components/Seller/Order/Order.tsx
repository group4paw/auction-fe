"use client";

import { useEffect, useState } from "react";
import ListOrder from "./ListOrder";
import axios from "axios";
import ListCart from "./ListCart";

export default function ListOrderComp() {
  const [listOrder, setListOrder] = useState([] as any[]);
  const [fetchStatus, setFetchStatus] = useState(false);
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
    let cart = [] as any[];
    let order = [] as any[];
    try {
      await axios
        .get("https://auction-api-4.vercel.app/order/seller/" + userId)
        .then((res) => {
          let resp = res.data.order;
          resp.sort((a: any, b: any) => {
            return (
              new Date(b.expiredDate).getTime() -
              new Date(a.expiredDate).getTime()
            );
          });

          setListOrder(resp);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ListOrder data={listOrder} />
    </>
  );
}
