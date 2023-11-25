"use client";

import { logIn } from "@/redux/features/auth-slice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import EasyBidImg from "@/assets/logo/EasyBid.svg";
import { Image } from "next/dist/client/image-component";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState<number | undefined>();
  const router = useRouter();

  const disp = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      if (localStorage.getItem("role") == "buyer") {
        router.push("/buy", { scroll: false });
      } else {
        router.push("/sell", { scroll: false });
      }
    }
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await axios
      .post("https://auction-api-4.vercel.app/seller/signin", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data.seller);
        disp(logIn({ user: res.data.customer, role: res.data.role }));
        localStorage.setItem("user", JSON.stringify(res.data.seller));
        localStorage.setItem("role", res.data.role);
        if (res.data.role == "buyer") {
          router.push("/buy");
        } else {
          router.push("/sell");
        }
      })
      .catch((error) => {
        setResponse(error.response.status);
      });
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
        {/* Background ambient */}
        <span className="absolute w-2/3 aspect-square bg-gradient-radial from-pink-500 from-0% to-transparent to-70% -z-50 translate-x-1/2 -translate-y-1/2 right-0 opacity-30" />
        <span className="absolute w-2/3 aspect-square bg-gradient-radial from-pink-500 from-0% to-transparent to-70% -z-50 -translate-x-1/2 translate-y-1/2 left-0 opacity-30" />
        <div className="max-w-sm w-full bg-shade-500 p-8 rounded-2xl">
          <div className="flex justify-center">
            <Image
              src={EasyBidImg}
              width={0}
              height={44}
              alt=""
              className="flex"
            />
          </div>
          <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                height={56}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-3 rounded-[12px] bg-transparent border border-2 border-neutral-100 placeholder-gray-500 text-lg outline-none text-neutral-100"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-3 rounded-[12px] bg-transparent border border-2 border-neutral-100 placeholder-gray-500 text-lg outline-none text-neutral-100"
                placeholder="Password"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full px-3 py-3 rounded-[12px] bg-blue-500 font-sarala text-2xl text-neutral-100"
              >
                Sign in
              </button>
            </div>
          </form>
          {response == 401 && (
            <p className="font-sarala text-base w-full mt-3 text-alert-red">
              *Incorrect username or password.
            </p>
          )}
        </div>
        <div className="flex flex-row justify-center mt-8 text-neutral-100 font-sarala text-base w-full">
          <p>Belum punya akun?</p>
          <a className="ml-1 font-bold">Daftar di sini</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
