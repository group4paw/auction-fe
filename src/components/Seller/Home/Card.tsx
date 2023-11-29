/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Timer from "../../Timer";
import Link from "next/link";
import Bookmark from "@/assets/icons/bookmark.svg";
import Bookmark_check from "@/assets/icons/bookmark-check.svg";
import axios from "axios";
import Clock from "@/assets/icons/clock.svg";
import Modal from "@/components/Modal";
import Notify from "@/components/Notify";

const Card = ({ data }: any) => {
  const [modal, setModal] = useState(false);
  const [notify, setNotify] = useState(false);
  const [user, setUser] = useState({} as any);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
    } else {
      setUser(JSON.parse(localStorage.getItem("user") || "{}"));
    }
  }, [data]);

  const cancel = () => {
    setModal(false);
  };

  const closeNotify = () => {
    setNotify(false);
    window.location.reload();
  };

  const handleCancelEvent = async () => {
    let dataBody = {
      userid: user._id,
    };
    try {
      await axios.delete(
        `https://auction-api-4.vercel.app/auction/${data._id}`,
        {
          data: dataBody,
        }
      );
      setModal(false);
      setNotify(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="relative flex flex-col rounded-lg w-80 h-96 bg-neutral-900 bg-opacity-50">
        <Image
          src={
            data.idPainting?.image.includes("https://")
              ? data.idPainting?.image
              : "https://auction-api-4.vercel.app/images/" +
                data.idPainting?.image
          }
          alt=""
          width={340}
          height={384}
          className="rounded-t-lg h-[14.5rem] object-cover"
        />
        <div className="flex flex-col px-4">
          <div className="flex flex-row justify-between">
            <p className="text-neutral-100 font-sarala font-bold text-base my-4 overflow-hidden truncate">
              {data.idPainting?.title}
            </p>
            <img
              src={data.owner?.image}
              alt=""
              className="rounded-full h-16 w-16 object-cover -mt-8"
            />
          </div>

          <div className="flex flex-row">
            <div className="flex-auto mb-2">
              <p className="font-sarala text-xs text-neutral-500">
                Highest bid
              </p>
              <p className="font-sarala text-sm text-neutral-100">
                Rp{data.highestBid}
              </p>
            </div>
            <div className="flex-auto text-right">
              <p className="font-sarala text-xs text-neutral-500">
                Auction {data.status == "live" ? "ends" : "start"} in
              </p>
              <div className="flex flex-row justify-end">
                <Image src={Clock} alt="" width={14} className="mr-1" />
                <p className="font-sarala text-sm text-neutral-100">
                  <Timer timer={data.timeLeft} />
                </p>
              </div>
            </div>
          </div>
          {data.status === "live" ? (
            <></>
          ) : data.status === "coming-soon" ? (
            <button
              onClick={() => {
                setModal(true);
              }}
              className="bg-shade-500 active:bg-blue-600 focus:ring focus:ring-blue-300 font-bold rounded-xl h-8 w-full mb-3 hover:bg-alert-red transition duration-100 ease-in-out"
            >
              <span className="text-neutral-500 font-sarala font-normal text-base">
                Cancel event
              </span>
            </button>
          ) : (
            <button
              disabled
              className="bg-alert-red active:bg-blue-600 focus:ring focus:ring-blue-300 text-white font-bold rounded-xl h-8 w-full mb-3"
            >
              <span className="text-white font-sarala font-normal text-base">
                Auction is over
              </span>
            </button>
          )}
        </div>

        {modal ? (
          <Modal
            cancel={cancel}
            confirm={handleCancelEvent}
            content="Are you sure want to cancel this auction?"
            isCancel={true}
            confirmText="Yes"
            cancelText="No"
            title="Cancel auction"
          />
        ) : null}

        {notify ? (
          <Notify
            confirm={closeNotify}
            content="Auction has been canceled"
            textButton="Ok"
          />
        ) : null}
      </div>
    </>
  );
};

export default Card;
