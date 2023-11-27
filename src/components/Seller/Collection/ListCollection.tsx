"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardArt from "./CardArt";
import { useDispatch } from "react-redux";
import { setNavbar } from "@/redux/features/navbar";

const ListCollection = () => {
  const [fetchStatus, setFetchStatus] = useState(false);
  const [user, setUser] = useState({} as any);
  const [listPainting, setListPainting] = useState([] as any[]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setNavbar("collection"));
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
    setListPainting([]);
    setIsLoading(true);
    try {
      await axios
        .get("https://auction-api-4.vercel.app/painting/user/" + userId)
        .then((res) => {
          setListPainting(res.data.paintings);
        });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      {!isLoading ? (
        listPainting.length > 0 ? (
          listPainting.map((item: any, index: any) => (
            <CardArt key={index} data={item} />
          ))
        ) : null
      ) : (
        <div className="w-screen flex justify-center items-center h-1/2">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-neutral-900"></div>
        </div>
      )}
    </>
  );
};

export default ListCollection;
