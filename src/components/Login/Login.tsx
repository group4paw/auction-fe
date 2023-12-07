"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginCard from "@/components/Login/LoginCard";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      if (localStorage.getItem("role") == "buyer") {
        router.push("/buy", { scroll: false });
      } else {
        router.push("/sell", { scroll: false });
      }
    }
  });

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background ambient */}
        <span className="absolute w-2/3 aspect-square bg-gradient-radial from-pink-500 from-0% to-transparent to-70% -z-50 translate-x-1/2 -translate-y-1/2 right-0 opacity-30" />
        <span className="absolute w-2/3 aspect-square bg-gradient-radial from-pink-500 from-0% to-transparent to-70% -z-50 -translate-x-1/2 translate-y-1/2 left-0 opacity-30" />
        <LoginCard />
        <div className="flex flex-row justify-center mt-8 text-neutral-100 font-sarala text-base w-full">
          <p>Belum punya akun?</p>
          <a
            className="ml-1 font-bold hover:underline transition-all
          "
            href="/register"
          >
            Daftar di sini
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
