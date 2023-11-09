import AuctionActivityComp from "@/components/Auction/Activity";
import AuctionCardDetail from "@/components/Auction/Card";
import AuctionDetailComp from "@/components/Auction/Details";

export default function AuctionDetail() {
  return (
    <div className="px-28 mt-9">
      <div className="flex mb-14">
        <AuctionCardDetail />
        <AuctionActivityComp />
      </div>
      <AuctionDetailComp />
    </div>
  );
}
