"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setNavbar } from "@/redux/features/navbar";
import { useRouter } from "next/navigation";

import Bookmark from "@/assets/icons/bookmark.svg";
import Cart from "@/assets/icons/cart.svg";
import Redeye from "@/assets/icons/redeye.svg";
import Hamburger from "@/assets/icons/hamburger.svg";
import Arrow from "@/assets/icons/arrow-right.svg";
import EasyBid from "@/assets/logo/EasyBid.svg";

const Navbar = () => {
  const [active, setActive] = React.useState(
    useSelector((state: any) => state.navbar.value)
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();

  const [isShow, setIsShow] = React.useState(false);

  const [user, setUser] = React.useState({} as any);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/login");
    } else setUser(JSON.parse(localStorage.getItem("user") || "{}"));
  }, []);

  return (
    <>
      <nav>
        <div className="w-full px-2 py-3 sm:px-6 lg:px-20 lg:py-7 bg-blue-700">
          <div className="relative flex items-center justify-between h-16">
            <div className="hidden lg:flex items-center flex-row gap-3">
              <Image
                src={user?.image ? user.image : ""}
                width={60}
                height={60}
                alt=""
                className="rounded-full aspect-square object-cover"
              />
              <div className="font-sarala flex items-start gap-2">
                <div>
                  <p className="text-neutral-100">Rp{user?.balance}</p>
                  <p className="text-neutral-500">@{user?.username}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Link href="/wishlist">
                    <Image src={Bookmark} alt="" width={14} />
                  </Link>
                  <Link href="/cart">
                    <Image src={Cart} alt="" width={24} />
                  </Link>
                  <Link href="/wishlist">
                    <Image src={Redeye} alt="" width={24} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="font-sarala border-2 border-neutral-900 px-1 py-1 lg:px-1.5 lg:py-1.5 flex lg:rounded-3xl rounded-2xl">
              <button
                onClick={(e) => {
                  setActive("live-auction");
                  dispatch(setNavbar("live-auction"));
                  if (pathname !== "/buy") router.push("/buy");
                }}
                className={`${
                  active == "live-auction"
                    ? "bg-pink-700 text-neutral-100"
                    : "bg-transparent text-neutral-700"
                } py-1 px-2 lg:py-2 lg:px-5 lg:rounded-2xl rounded-xl text-[12px] lg:text-[16px]`}
              >
                Live Auction
              </button>
              <button
                onClick={(e) => {
                  setActive("coming-soon");
                  dispatch(setNavbar("coming-soon"));
                  if (pathname !== "/buy") router.push("/buy");
                }}
                className={`${
                  active == "coming-soon"
                    ? "bg-pink-700 text-neutral-100"
                    : "bg-transparent text-neutral-700"
                } py-1 px-2 lg:py-2 lg:px-5  lg:rounded-2xl rounded-xl text-[12px] lg:text-[16px]`}
              >
                Coming Soon
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/buy"
                onClick={() => {
                  dispatch(setNavbar(""));
                }}
              >
                <Image
                  src={EasyBid}
                  alt="Logo EasyBid"
                  sizes="100vw"
                  className="w-[80%] h-auto lg:w-full lg:h-auto"
                />
              </Link>
              <Image
                src={Hamburger}
                alt=""
                width={32}
                onClick={() => setIsShow(!isShow)}
                className="lg:hidden"
              />
            </div>
          </div>
        </div>
        {isShow && (
          <div
            className="z-20 bg-blue-700 w-full absolute top-[80px] block lg:hidden px-8 pb-5 border-t-2 border-neutral-900 transition-all duration-500 ease-in-out
          "
          >
            <div className="flex items-center gap-3 py-5">
              <Image
                src={user.image}
                width={60}
                height={60}
                alt=""
                className="rounded-full aspect-square object-cover"
              />
              <div className="font-sarala flex items-start gap-2">
                <div>
                  <p className="text-neutral-100">Rp{user.balance}</p>
                  <p className="text-neutral-500">@{user.username}</p>
                </div>
              </div>
            </div>
            <Link href="/wishlist">
              <div className="text-neutral-500 text-[16px]  flex justify-between">
                <div className="flex gap-4 items-center">
                  <Image src={Bookmark} alt="" width={32} />
                  <p>Wishlist</p>
                </div>
                <Image src={Arrow} alt="" width={16} />
              </div>
            </Link>
            <Link href="/cart">
              <div className="text-neutral-500 text-[16px] my-3 flex justify-between">
                <div className="flex gap-4 items-center">
                  <Image src={Cart} alt="" width={32} />
                  <p>Cart</p>
                </div>
                <Image src={Arrow} alt="" width={16} />
              </div>
            </Link>
            <Link href="/wishlist">
              <div className="text-neutral-500 text-[16px] flex justify-between">
                <div className="flex gap-4 items-center">
                  <Image src={Redeye} alt="" width={32} />
                  <p>Bid Activity</p>
                </div>
                <Image src={Arrow} alt="" width={16} />
              </div>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
