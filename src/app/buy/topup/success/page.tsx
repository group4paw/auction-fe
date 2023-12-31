"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const SuccessTopUp = () => {
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("order_id")) {
      window.location.href = "/buy";
    }
    update(localStorage.getItem("order_id"));
  }, []);

  const update = async (order_id: any) => {
    try {
      await axios
        .put("https://auction-api-4.vercel.app/payment/topup", {
          orderId: order_id,
        })
        .then((res) => {
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(res.data.customer));
          setSuccess(true);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {success ? (
        <div className="flex flex-col items-center justify-center w-[90%] lg:w-1/4 mx-auto mt-[20vh]">
          <div className="w-full flex items-center px-5 h-[20%] bg-neutral-900 overflow-hidden rounded-t-2xl text-neutral-300 justify-between">
            <p>Success</p>
          </div>
          <div className="w-full h-[80%] px-5 py-5 flex flex-col justify-between bg-white rounded-b-xl">
            <p className=" text-neutral-900 text-[16px] font-bold">
              Your top up has been successfully processed, refresh page to see
            </p>
            <div className="flex justify-end gap-2">
              <Link
                href="/buy"
                className="px-5 py-1 bg-blue-500 rounded-xl text-neutral-100"
              >
                Back to
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SuccessTopUp;
