"use client";

import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import BackToTop from "./BackToTop";
import Image from "next/image";
import EasyBid from "@/assets/logo/EasyBid.svg";

export default function Footer() {
  return (
    <>
      <div className="w-full bg-shade-500 px-5 pt-3 sm:px-6 lg:px-20 lg:pt-8 bg-opacity-70 2xl:px-32 overflow-hidden">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <p className="text-neutral-500 text-[16px] mb-3">Connect with us</p>
            <div className="flex flex-row gap-4">
              <FaTwitter className="text-white text-[24px]" />
              <FaFacebook className="text-white text-[24px]" />
              <FaInstagram className="text-white text-[24px]" />
              <FaLinkedin className="text-white text-[24px]" />
            </div>
          </div>
          <BackToTop />
        </div>

        <Image
          src={EasyBid}
          alt="Logo EasyBid"
          sizes="100vw"
          className="w-[80%] h-auto lg:w-[50%] lg:h-auto mt-10 relative bottom-[-15px] lg:bottom-[-25px]"
        />
      </div>
    </>
  );
}
