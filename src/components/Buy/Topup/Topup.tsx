"use client";

import axios from "axios";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    snap: any;
  }
}

export default function TopupComponent() {
  const [amount, setAmount] = useState(0);
  const [token, setToken] = useState("");

  const handleClick = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const data = {
        amount: amount,
        userId: user._id,
      };

      const response = await axios.post(
        "https://auction-api-4.vercel.app/payment/topup",
        data,
        config
      );
      setToken(response.data.token);
    } catch (err) {
      console.log(err);
    }
  };

  const update = async (order_id: any) => {
    await axios
      .put("https://auction-api-4.vercel.app/payment/topup", {
        orderId: order_id,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.customer));
      });
  };

  useEffect(() => {
    if (token) {
      window.snap.pay(token, {
        onSuccess: function (result: any) {
          update(result.order_id);
          setToken("");
        },
        onPending: function (result: any) {
          setToken("");
        },
        onError: function (result: any) {
          console.log("error", result);
          setToken("");
        },
        onClose: function () {
          console.log(
            "Customer closed the popup without finishing the payment"
          );
          setToken("");
        },
      });
    }
  }, [token]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL || "";
    const midtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "";
    script.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div className="w-full flex gap-3 justify-between items-start">
        <div className="bg-neutral-900/30 py-5 p-8 rounded-3xl w-[70%] ">
          <div className="flex flex-col gap-3">
            <label className="text-neutral-100">Top up amount (Rp)</label>
            <input
              className=" bg-transparent rounded-xl px-5 py-3 text-neutral-100 border-2 border-neutral-100 rounded-xl focus:outline-none"
              type="number"
              value={amount || ""}
              placeholder="120000000"
              onChange={(e: any) => {
                setAmount(e.target.value);
              }}
            />
          </div>
          <div className="font-sarala text-neutral-500 my-5 text-[12px]">
            <p>
              Payment will be processed via Midtrans.
              <br /> By clicking Pay Now, you agree to our Terms and Conditions
            </p>
          </div>
        </div>
        <button
          onClick={handleClick}
          className={`w-[30%] 
          ${
            amount <= 0
              ? "bg-neutral-900 text-neutral-700 cursor-not-allowed"
              : "bg-blue-500 text-neutral-100 cursor-pointer"
          }
          px-5 py-3 rounded-xl text-[20px] font-sarala font-bold`}
        >
          Pay Now
        </button>
      </div>
    </>
  );
}
