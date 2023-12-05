"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
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
import Logout from "@/assets/icons/logout.svg";
import { logOut } from "@/redux/features/auth-slice";
import axios from "axios";
import Modal from "../Modal";

const Navbar = () => {
  const [active, setActive] = useState(
    useSelector((state: any) => state.navbar.value)
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();

  const [isShow, setIsShow] = useState(false);

  const [user, setUser] = useState({} as any);
  const [countWislist, setCountWishlist] = useState(0);
  const [countActivity, setCountActivity] = useState(0);
  const [countOrder, setCountOrder] = useState(0);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/login");
    } else setUser(JSON.parse(localStorage.getItem("user") || "{}"));
  }, [router]);

  useEffect(() => {
    if (user._id) {
      fetchInfo();
    }
  });

  const fetchInfo = async () => {
    try {
      await axios
        .get("https://auction-api-4.vercel.app/customer/info/" + user._id)
        .then((res) => {
          let result = res.data.data;
          setCountWishlist(result.countWishlist);
          setCountActivity(result.countBid);
          setCountOrder(result.countOrder);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch(logOut());
    router.push("/login");
  };

  const cancel = () => {
    setModal(false);
  };

  return (
    <>
      <nav>
        <div className="w-full px-2 py-3 sm:px-6 lg:px-20 lg:py-7 bg-blue-700">
          <div className="relative flex items-center justify-between h-16">
            <div className="hidden lg:flex items-center flex-row gap-3">
              <Image
                src={
                  user?.image
                    ? user.image
                    : "https://cdn.vectorstock.com/i/preview-1x/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg"
                }
                width={60}
                height={60}
                alt=""
                className="rounded-full aspect-square object-cover"
              />
              <div className="font-sarala flex items-start gap-2">
                <div>
                  <Link href="/buy/topup">
                    <p className="text-neutral-100">Rp{user?.balance}</p>
                  </Link>
                  <p className="text-neutral-500">@{user?.username}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Link href="/buy/wishlist" className="relative">
                    {countWislist > 0 && (
                      <div className="absolute top-[-5px] right-[-5px] w-[12px] h-[12x] aspect-square text-center  text-[8px] text-white rounded-full bg-[#F31260]">
                        {countWislist}
                      </div>
                    )}
                    <Image src={Bookmark} alt="" width={14} />
                  </Link>
                  <Link href="/buy/order">
                    {countOrder > 0 && (
                      <div className="absolute top-[-2px] right-[-2px] w-[12px] h-[12x] aspect-square text-center  text-[8px] text-white rounded-full bg-[#F31260]">
                        {countOrder}
                      </div>
                    )}
                    <Image src={Cart} alt="" width={24} />
                  </Link>
                  <Link href="/buy/activity" className="relative mr-1">
                    {countActivity > 0 && (
                      <div className="absolute top-[-2px] right-[-2px] w-[12px] h-[12x] aspect-square text-center  text-[8px] text-white rounded-full bg-[#F31260]">
                        {countActivity}
                      </div>
                    )}
                    <Image src={Redeye} alt="" width={24} />
                  </Link>
                  <div
                    onClick={() => {
                      setModal(true);
                    }}
                    className="cursor-pointer"
                  >
                    <Image src={Logout} alt="" width={20} />
                  </div>
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
            <div
              onClick={() => {
                setActive("");
                dispatch(setNavbar(""));
                if (pathname !== "/buy") router.push("/buy");
              }}
              className="w-auto lg:w-[20%]  h-full flex justify-end items-center gap-2"
            >
              <Link href="/buy" className="lg:w-7/12 h-auto">
                <Image
                  src={EasyBid}
                  alt="Logo EasyBid"
                  sizes="100vw"
                  className="w-[80%] h-auto lg:w-full lg:h-auto object-contain"
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
            <Link href="/buy/wishlist">
              <div className="text-neutral-500 text-[16px]  flex justify-between">
                <div className="flex gap-4 items-center">
                  <Image src={Bookmark} alt="" width={16} />
                  <p>Wishlist</p>
                </div>
                <Image src={Arrow} alt="" width={16} />
              </div>
            </Link>
            <Link href="/buy/cart">
              <div className="text-neutral-500 text-[16px] my-3 flex justify-between">
                <div className="flex gap-4 items-center">
                  <Image src={Cart} alt="" width={26} />
                  <p>Cart</p>
                </div>
                <Image src={Arrow} alt="" width={16} />
              </div>
            </Link>
            <Link href="/buy/activity">
              <div className="text-neutral-500 text-[16px] flex justify-between">
                <div className="flex gap-4 items-center">
                  <Image src={Redeye} alt="" width={26} />
                  <p>Bid Activity</p>
                </div>
                <Image src={Arrow} alt="" width={16} />
              </div>
            </Link>
            <div
              onClick={() => {
                setModal(true);
              }}
              className="text-neutral-500 text-[16px] flex  my-3 justify-between"
            >
              <div className="flex gap-4 items-center justify-center">
                <Image src={Logout} alt="" width={24} />
                <p>Logout</p>
              </div>
              <Image src={Arrow} alt="" width={16} />
            </div>
          </div>
        )}
      </nav>
      {modal ? (
        <Modal
          cancel={cancel}
          confirm={logout}
          title={"Confirm"}
          content={"Are you sure you want to log out from your account?"}
          isCancel
          confirmText={"Yes, log out"}
          cancelText={"No"}
        />
      ) : null}
    </>
  );
};

export default Navbar;
