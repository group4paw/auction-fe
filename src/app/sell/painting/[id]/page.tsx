import PaintingDetail from "@/components/Seller/Painting/Painting";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail Painting | Easybid",
  description: "...",
};

export default function AuctionDetail() {
  return (
    <>
      <PaintingDetail />
    </>
  );
}
