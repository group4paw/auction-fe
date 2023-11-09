/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Clock from "@/assets/icons/clock.svg";
import { useDispatch, useSelector } from "react-redux";
import { setAuction } from "@/redux/features/auction";

const Card = ({ data }: any) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex flex-col rounded-lg w-80 h-96 bg-neutral-900 bg-opacity-50">
        <img
          src={data.idPainting.image}
          alt=""
          className="rounded-t-lg h-[14.5rem] object-cover"
        />
        <div className="flex flex-col px-4">
          <div className="flex flex-row justify-between">
            <p className="text-neutral-100 font-sarala font-bold text-base my-4 overflow-hidden truncate">
              {data.idPainting.title}
            </p>
            <img
              src={data.owner.image}
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
                {data.highestBid}
              </p>
            </div>
            <div className="flex-auto text-right">
              <p className="font-sarala text-xs text-neutral-500">
                Auction ends In
              </p>
              <div className="flex flex-row justify-end">
                <Image src={Clock} alt="" width={14} className="mr-1" />
                <p className="font-sarala text-sm text-neutral-100">
                  12 : 08 : 25
                </p>
              </div>
            </div>
          </div>
          {data.status === "live" ? (
            <button
              onClick={() => {
                window.location.href = `/auction/${data._id}`;
              }}
              className="bg-blue-500 active:bg-blue-600 focus:ring focus:ring-blue-300 text-white font-bold rounded-xl h-8 w-full mb-3"
            >
              <span className="text-neutral-100 font-sarala font-normal text-base">
                Make an offer
              </span>
            </button>
          ) : data.status === "coming-soon" ? (
            <button
              disabled
              className="bg-neutral-900 active:bg-blue-600 focus:ring focus:ring-blue-300 text-white font-bold rounded-xl h-8 w-full mb-3"
            >
              <span className="text-neutral-700 font-sarala font-normal text-base">
                Coming Soon
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
      </div>
    </>
  );
};

export default Card;
