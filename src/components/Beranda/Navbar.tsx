"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import EasyBid from "@/assets/logo/EasyBid.svg";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <>
      <nav>
        <div className="w-full px-5 py-3 sm:px-6 lg:px-20 lg:py-5 2xl:px-32">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex items-center flex-row gap-3">
              <Link href="/">
                <Image
                  src={EasyBid}
                  alt="Logo EasyBid"
                  sizes="100vw"
                  className="w-[80%] h-auto lg:w-full lg:h-auto"
                />
              </Link>
            </div>
            <div className="lg:flex hidden font-sarala flex items-center  text-[20px]">
              <Link
                href="/"
                className={`  ${
                  pathname == "/"
                    ? "text-blue-100 border-b-2 border-blue-100 leading-tight"
                    : "text-neutral-300"
                }`}
              >
                Home
              </Link>
              <Link
                href="/sell"
                className={`mx-20  ${
                  pathname == "/sell"
                    ? "text-blue-100 border-b-2 border-blue-100 leading-tight"
                    : "text-neutral-300"
                }`}
              >
                Sell
              </Link>
              <Link
                href="/buy"
                className={` ${
                  pathname == "/buy"
                    ? "text-blue-100 border-b-2 border-blue-100 leading-tight"
                    : "text-neutral-300"
                }`}
              >
                Buy
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/login">
                <button className="text-[18px] px-5 py-2 bg-shade-500 rounded-2xl text-neutral-500 hover:bg-blue-500 hover:text-white transition-all">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
