"use client";

import "@/app/globals.css";

import { Staatliches, Sarala } from "next/font/google";
import Navbar from "@/components/Seller/NavbarSell";
import { Providers } from "@/redux/provider";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (typeof window !== "undefined") {
    if (localStorage && localStorage.getItem("role") != "seller") {
      window.location.href = "/login";
    }
  }

  return (
    <Providers>
      <html lang="en">
        <body className={``}>
          <Navbar />
          <Providers>{children}</Providers>
        </body>
      </html>
    </Providers>
  );
}
