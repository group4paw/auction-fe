"use client";

import Image from "next/image";
import React, { use, useEffect, useState } from "react";
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
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/login");
    } else setUser(JSON.parse(localStorage.getItem("user") || "{}"));

    if (pathname == "/sell") {
      setActive("active-bid");
      dispatch(setNavbar("active-bid"));
    }
    if (pathname == "/sell/collection") {
      setActive("collection");
      dispatch(setNavbar("collection"));
    }
    if (pathname == "/sell/order") {
      setActive("order");
      dispatch(setNavbar("order"));
    }
  }, []);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        await axios
          .get("https://auction-api-4.vercel.app/customer/info/" + user.id)
          .then((res) => {
            let result = res.data.data;
            setCountWishlist(result.countWishlist);
            setCountActivity(result.countBid);
          });
      } catch (error) {
        console.log(error);
      }
    };
    if (user._id) {
      fetchInfo();
    }
  }, [user]);

  useEffect(() => {}, [active]);

  const fetchInfo = async () => {
    try {
      await axios
        .get("https://auction-api-4.vercel.app/customer/info/" + user.id)
        .then((res) => {
          let result = res.data.data;
          setCountWishlist(result.countWishlist);
          setCountActivity(result.countBid);
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
                  <p className="text-neutral-100">Rp{user?.balance}</p>
                  <p className="text-neutral-500">@{user?.username}</p>
                </div>
                <div className="h-full font-sarala flex items-start justify-start">
                  <div
                    onClick={() => {
                      setModal(true);
                    }}
                    className="h-full cursor-pointer flex items-center"
                  >
                    <Image src={Logout} alt="" width={20} />
                  </div>
                </div>
              </div>
            </div>
            <div className="font-sarala border-2 border-neutral-900 px-1 py-1 lg:px-1.5 lg:py-1.5 flex lg:rounded-3xl rounded-2xl">
              <button
                onClick={(e) => {
                  setActive("active-bid");
                  dispatch(setNavbar("active-bid"));
                  if (pathname !== "/sell") router.push("/sell");
                }}
                className={`${
                  active == "active-bid"
                    ? "bg-pink-700 text-neutral-100"
                    : "bg-transparent text-neutral-700"
                } py-1 px-2 lg:py-2 lg:px-5 lg:rounded-2xl rounded-xl text-[12px] lg:text-[16px]`}
              >
                Your active bid
              </button>
              <button
                onClick={(e) => {
                  setActive("collection");
                  dispatch(setNavbar("collection"));
                  router.push("/sell/collection");
                }}
                className={`${
                  active == "collection"
                    ? "bg-pink-700 text-neutral-100"
                    : "bg-transparent text-neutral-700"
                } py-1 px-2 lg:py-2 lg:px-5 lg:rounded-2xl rounded-xl text-[12px] lg:text-[16px]`}
              >
                Collection
              </button>
              <button
                onClick={(e) => {
                  setActive("order");
                  dispatch(setNavbar("order"));
                  if (pathname !== "/sell/order") router.push("/sell/order");
                }}
                className={`${
                  active == "order"
                    ? "bg-pink-700 text-neutral-100"
                    : "bg-transparent text-neutral-700"
                } py-1 px-2 lg:py-2 lg:px-5  lg:rounded-2xl rounded-xl text-[12px] lg:text-[16px]`}
              >
                Order Status
              </button>
            </div>
            <div className="w-auto lg:w-[20%]  h-full flex justify-end items-center gap-2">
              <Link
                href="/sell"
                onClick={() => {
                  dispatch(setNavbar(""));
                }}
                className="lg:w-7/12 h-auto flex justify-center items-center"
              >
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
            <div className="flex items-center justify-between gap-3 py-5">
              <div className="flex items-center gap-3">
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
