import Image from "next/image";
import Timer from "../../Timer";
import Bookmark from "@/assets/icons/bookmark.svg";
import Bookmark_check from "@/assets/icons/bookmark-check.svg";
import axios from "axios";
import Clock from "@/assets/icons/clock.svg";

const Card = ({ data }: any) => {
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
          .then((res) => {
            console.log(res);
          });
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

  return (
    <>
      <div className="relative flex flex-col rounded-lg w-80 h-96 bg-neutral-900 bg-opacity-50">
        <button
          onClick={handleWishlist}
          className="absolute top-2 left-2 rounded-full p-2 aspect-square bg-neutral-700/[0.5]"
        >
          <Image
            src={data.isWishlist ? Bookmark_check : Bookmark}
            width={20}
            height={20}
            alt=""
            className="robject-cover aspect-square"
          />
        </button>
        <Image
          src={data.idPainting?.image || ""}
          alt=""
          width={340}
          height={384}
          className="rounded-t-lg h-[14.5rem] object-cover"
        />
        <div className="flex flex-col px-4">
          <div className="flex flex-row justify-between">
            <p className="text-neutral-100 font-sarala font-bold text-base my-4 overflow-hidden truncate">
              {data.idPainting?.title}
            </p>
            <img
              src={data.owner?.image}
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
                Rp{data.highestBid}
              </p>
            </div>
            <div className="flex-auto text-right">
              <p className="font-sarala text-xs text-neutral-500">
                Auction ends In
              </p>
              <div className="flex flex-row justify-end">
                <Image src={Clock} alt="" width={14} className="mr-1" />
                <p className="font-sarala text-sm text-neutral-100">
                  <Timer timer={data.timeLeft} />
                </p>
              </div>
            </div>
          </div>
          {data.status === "live" ? (
            <button
              onClick={() => {
                window.location.href = `/buy/auction/${data._id}`;
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
