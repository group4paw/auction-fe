"use client";

import "@/app/globals.css";

import { Staatliches, Sarala } from "next/font/google";
import Navbar from "@/components/Buy/NavbarBuy";
import { Providers } from "@/redux/provider";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

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
