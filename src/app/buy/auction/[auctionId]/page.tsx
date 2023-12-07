import AuctionPage from "@/components/Buy/Auction/Page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail Auction",
  description: "...",
};

export default function AuctionDetail() {
  return (
    <>
      <AuctionPage />
    </>
  );
}
