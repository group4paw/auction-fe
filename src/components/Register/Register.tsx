"use client";

import React from "react";
import { Image } from "next/dist/client/image-component";
import RegisterCard from "@/components/Register/RegisterCard";
import ArrowBack from "@/assets/icons/arrow-back.svg";

const Register = () => {
  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background ambient */}
        <span className="absolute w-2/3 aspect-square bg-gradient-radial from-pink-500 from-0% to-transparent to-70% -z-50 translate-x-1/2 -translate-y-1/2 right-0 opacity-30" />
        <span className="absolute w-2/3 aspect-square bg-gradient-radial from-pink-500 from-0% to-transparent to-70% -z-50 -translate-x-1/2 translate-y-1/2 left-0 opacity-30" />
        <a
          href="/login"
          className="flex flex-row max-w-sm w-full text-neutral-100 font-sarala font-bold text-base ml-3 mb-5"
        >
          <Image src={ArrowBack} height={18} alt="Back" className="mr-5" />
          <p>Kembali</p>
        </a>
        <RegisterCard />
      </div>
    </div>
  );
};

export default Register;
