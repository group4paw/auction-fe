import Image from "next/image";
import Bookmark from "@/assets/icons/bookmark.svg";
import Timer from "../../Timer";
import Clock from "@/assets/icons/clock.svg";
import Bookmark_check from "@/assets/icons/bookmark-check.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "@/components/Modal";
import ModalBid from "./ModalBid";

export default function AuctionCardDetail({ data }: any) {
  const [modal, setModal] = useState(false);
  const [modalbid, setModalBid] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      let userId = JSON.parse(localStorage.getItem("user") || "{}")._id;
      fetchInfo(userId);
    }
  });

  const fetchInfo = async (userId: any) => {
    await axios
      .get("https://auction-api-4.vercel.app/wishlist/" + userId)
      .then((res) => {
        let wishlist = res.data;
        let isWishlist = false;
        wishlist.forEach((wish: any) => {
          if (data._id == wish.idAuction) {
            isWishlist = true;
          }
        });
        data.isWishlist = isWishlist;
      });
  };

  const handleWishlist = async () => {
    let userId = JSON.parse(localStorage.getItem("user") || "{}")._id;
    let auctionId = data._id;
    let isWishlist = data.isWishlist;

    try {
      if (isWishlist) {
        await axios
          .delete(
            `https://auction-api-4.vercel.app/wishlist/${userId}/${auctionId}`
          )
          .then((res) => {});
        alert("Auction has been removed from your wishlist");
      } else {
        await axios.post(`https://auction-api-4.vercel.app/wishlist/`, {
          idCustomer: userId,
          idAuction: auctionId,
        });
        alert("Auction has been added to your wishlist");
      }
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickWishlist = () => {
    if (data.isWishlist) {
      setModal(true);
    } else handleWishlist();
  };

  const cancel = () => {
    setModal(false);
  };

  const cancelBid = () => {
    setModalBid(false);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row rounded-xl lg:rounded-2xl overflow-hidden font-sarala mb-10 lg:mb-0">
      <Image
        src={data.idPainting?.image || ""}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "40%", height: "100%" }} // optional
        className="lg:block hidden"
      />
      <Image
        src={data.idPainting?.image || ""}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "100%" }} // optional
        className="lg:hidden block"
      />
      <div className="flex bg-neutral-900 p-6 flex-col justify-between">
        <div className="flex-col lg:mb-10">
          <div className="flex flex-row justify-between">
            <div className="flex gap-2 items-center">
              <Image
                src={data.owner?.image}
                width={0}
                height={0}
                sizes="100vw"
                alt=""
                className="rounded-full object-cover aspect-square"
                style={{ width: "15%", height: "100%" }} // optional
              />
              <div className="font-sarala text-neutral-300">
                <p className="lg:text-[9px] text-[14px]">Artist</p>
                <p className="lg:text-[14px] text-[18px]">
                  @{data.owner?.name}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center bg-neutral-700 rounded-full w-[42px] h-[42px] aspect-square cursor-pointer">
              <button
                onClick={handleClickWishlist}
                className="rounded-full p-2 aspect-square bg-neutral-700/[0.5]"
              >
                <Image
                  src={data.isWishlist ? Bookmark_check : Bookmark}
                  width={20}
                  height={20}
                  alt=""
                  className="robject-cover aspect-square"
                />
              </button>
            </div>
          </div>
          <h6 className="text-[28px] text-neutral-100 my-5 font-bold">
            {data.idPainting?.title}
          </h6>
          <p className="text-justify lg:text-left text-[14px] text-neutral-500 mb-10 lg:mb-0 ">
            {data.idPainting?.description}
          </p>
        </div>
        <div className="flex-col">
          <div className="flex justify-between">
            <div>
              <p className="text-[14px] text-neutral-500">Highest bid</p>
              <p className="text-[20px] text-neutral-100">
                Rp{data.highestBid}
              </p>
            </div>
            <div>
              <div className="text-[14x] text-neutral-500 text-right">
                Auction Ends In
              </div>
              <div className="flex flex-row justify-end">
                <Image src={Clock} alt="" width={14} className="mr-1" />
                <div className="font-sarala text-[20px] text-neutral-100">
                  <Timer timer={data.timeLeft} />
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setModalBid(true);
            }}
            className="w-full bg-blue-500 py-2 text-neutral-100 rounded-xl mt-2"
          >
            Place a bid
          </button>
        </div>
      </div>
      {modal ? (
        <Modal
          cancel={cancel}
          confirm={handleWishlist}
          content="Are you sure want to remove this auction from your wishlist?"
          isCancel={true}
          confirmText="Yes"
          cancelText="No"
          title="Remove Wishlist"
        />
      ) : null}

      {modalbid ? (
        <ModalBid
          cancel={cancelBid}
          auctionId={data._id}
          highestBid={data.highestBid}
        />
      ) : null}
    </div>
  );
}
