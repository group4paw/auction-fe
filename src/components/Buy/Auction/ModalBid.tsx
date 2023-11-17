import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import axios from "axios";

const ModalBid = ({ cancel, highestBid, auctionId }: any) => {
  const [balance, setBalance] = React.useState(0);
  const [bid, setBid] = React.useState(highestBid + 100);
  const [userId, setUserId] = React.useState("");

  useEffect(() => {
    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user") || "{}");
      setBalance(user.balance);
      setUserId(user._id);
    }
  }, []);

  const handleConfirm = async () => {
    try {
      await axios
        .put(`https://auction-api-4.vercel.app/auction/${auctionId}/bid`, {
          userid: userId,
          amount: bid,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            localStorage.setItem("user", JSON.stringify(res.data.customer));
            window.location.reload();
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-shade-500 fixed inset-0 z-[1000] overflow-auto bg-opacity-80 font-sarala text-[16px]">
      <motion.div
        initial={{ opacity: 1 }}
        whileInView={{ opacity: 1 }}
        animate={{ y: 100 }}
        exit={{ y: 0, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          duration: 3,
          x: { duration: 1 },
        }}
        className="w-11/12 md:w-3/12 h-auto flex flex-col justify-center items-center bg-shade-500 rounded-2xl -mt-[200px]"
      >
        <>
          <div className="flex items-center p-5 h-auto w-full bg-shade-500 overflow-hidden rounded-t-2xl text-neutral-300 justify-between">
            <p className="text-center grow text-[16px] font-bold">
              Place a bid (Rp)
            </p>
            <div onClick={cancel} className="text-[20px] cursor-pointer">
              <MdClose />
            </div>
          </div>
          <div className="font-staatliches flex justify-around w-full my-3">
            <button
              onClick={() => {
                if (bid > highestBid + 100) {
                  setBid(bid - 100);
                }
              }}
            >
              <h2
                className={`${
                  bid === highestBid + 100
                    ? "text-shade-100 cursor-default"
                    : "text-neutral-100"
                }`}
              >
                -
              </h2>
            </button>
            <h2 className={`text-neutral-100`}>{bid}</h2>
            <button
              onClick={() => {
                if (bid < balance) {
                  setBid(bid + 100);
                }
              }}
            >
              <h2 className={`text-neutral-100`}>+</h2>
            </button>
          </div>
          <div className="w-full h-[80%] px-5 py-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-300 text-[12px]">Sisa saldo Anda</p>
                <p className="text-neutral-300 text-[16px] font-bold">
                  Rp. {balance}
                </p>
              </div>
              <Link href="/buy/topup">
                <button className="text-neutral-500 text-[16px]">Top Up</button>
              </Link>
            </div>
            <div className="w-full flex justify-center gap-2 mt-5">
              <button
                onClick={handleConfirm}
                className="w-full px-5 py-1 bg-blue-500 rounded-xl text-neutral-100"
              >
                Confirm
              </button>
            </div>
          </div>
        </>
      </motion.div>
    </div>
  );
};

export default ModalBid;
