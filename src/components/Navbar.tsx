"use client";

import Image from "next/image";
import React, { useEffect, useLayoutEffect } from "react";
import Bookmark from "@/assets/icons/bookmark.svg";
import Cart from "@/assets/icons/cart.svg";
import Redeye from "@/assets/icons/redeye.svg";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setNavbar } from "@/redux/features/navbar";

const Navbar = () => {
  const [active, setActive] = React.useState(
    useSelector((state: any) => state.navbar.value)
  );

  const dispatch = useDispatch();

  return (
    <>
      <nav>
        <div className="w-full px-2 sm:px-6 lg:px-20 lg:py-7 bg-blue-700">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Image
                src="https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width={60}
                height={60}
                alt=""
                className="rounded-full aspect-square object-cover"
              />
              <div className="font-sarala flex items-start gap-2">
                <div>
                  <p className="text-neutral-100">Rp534.000.000</p>
                  <p className="text-neutral-500">@ouroboros</p>
                </div>
                <div className="flex gap-1">
                  <Link href="/wishlist">
                    <Image src={Bookmark} alt="" width={32} />
                  </Link>
                  <Link href="/cart">
                    <Image src={Cart} alt="" width={32} />
                  </Link>
                  <Link href="/wishlist">
                    <Image src={Redeye} alt="" width={32} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative font-sarala border-2 border-neutral-900 px-1.5 py-1.5 flex rounded-3xl">
              <button
                onClick={(e) => {
                  setActive("live-auction");
                  dispatch(setNavbar("live-auction"));
                }}
                className={`${
                  active == "live-auction"
                    ? "bg-pink-700 text-neutral-100"
                    : "bg-transparent text-neutral-700"
                } py-2 px-5 rounded-2xl`}
              >
                Live Auction
              </button>
              <button
                onClick={(e) => {
                  setActive("coming-soon");
                  dispatch(setNavbar("coming-soon"));
                }}
                className={`${
                  active == "coming-soon"
                    ? "bg-pink-700 text-neutral-100"
                    : "bg-transparent text-neutral-700"
                } py-2 px-5 rounded-2xl`}
              >
                Coming Soon
              </button>
            </div>
            <div>
              <h3 className="font-staatliches text-white">EASYBID</h3>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
