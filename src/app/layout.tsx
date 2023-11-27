import "./globals.css";

import { Staatliches, Sarala } from "next/font/google";
import { Providers } from "@/redux/provider";

const sarala = Sarala({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--sarala-font",
});

const staatliches = Staatliches({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--staatliches-font",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={`${sarala.variable} ${staatliches.variable}`}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </Providers>
  );
}
