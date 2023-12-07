import Navbar from "@/components/Beranda/Navbar";
import Hero from "@/components/Beranda/Hero";
import type { Metadata } from "next";
import Footer from "@/components/Beranda/Footer";
import TrendingArts from "@/components/Beranda/TrendingArts";

export const metadata: Metadata = {
  title: "Easybid",
  description: "...",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center lg:justify-between">
      <div className="z-10 w-full items-center justify-center lg:justify-start gap-4 font-white">
        <Navbar />
        <Hero />
        <TrendingArts />
        <Footer />
      </div>
    </main>
  );
}
