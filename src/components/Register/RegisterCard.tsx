"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "@/redux/features/auth-slice";
import axios from "axios";
import { Image } from "next/dist/client/image-component";
import EasyBidImg from "@/assets/logo/EasyBid.svg";
import AddPhoto from "@/assets/icons/add-photo.svg";
import { useRouter } from "next/navigation";
import Modal from "../Modal";

const RegisterCard = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [response, setResponse] = useState<number | undefined>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [modal, setModal] = useState(false);
  const [chooseRole, setChooseRole] = useState("customer");
  const router = useRouter();

  const disp = useDispatch();

  const handleDropInput = (event: DragEvent) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await axios
      .post(`https://auction-api-4.vercel.app/${chooseRole}/signup`, {
        name: fullName,
        username: userName,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        address: address,
      })
      .then((res) => {
        console.log(res.data);
        if (res.status == 201) setModal(true);
      })
      .catch((error) => {
        setResponse(error.response.status);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      if (localStorage.getItem("role") == "buyer") {
        router.push("/buy", { scroll: false });
      } else {
        router.push("/sell", { scroll: false });
      }
    }
  });

  //   useEffect(() => {
  //     console.log(imageFile?.name);
  //   }, [imageFile]);

  return (
    <div className="max-w-sm w-full bg-shade-500 p-8 rounded-2xl">
      <div className="flex justify-center">
        <Image src={EasyBidImg} width={0} height={44} alt="" className="flex" />
      </div>
      <div className="w-full font-sarala border-2 border-neutral-900 px-1 py-1 lg:px-1.5 lg:py-1.5 flex lg:rounded-3xl rounded-2xl my-5">
        <button
          onClick={(e) => {
            setChooseRole("customer");
          }}
          className={`${
            chooseRole == "customer"
              ? "bg-pink-700 text-neutral-100"
              : "bg-transparent text-neutral-700"
          } w-1/2 py-1 px-2 lg:py-2 lg:px-5 lg:rounded-2xl rounded-xl text-[12px] lg:text-[16px]`}
        >
          Buy
        </button>
        <button
          onClick={(e) => {
            setChooseRole("seller");
          }}
          className={`${
            chooseRole == "seller"
              ? "bg-pink-700 text-neutral-100"
              : "bg-transparent text-neutral-700"
          } w-1/2 py-1 px-2 lg:py-2 lg:px-5  lg:rounded-2xl rounded-xl text-[12px] lg:text-[16px]`}
        >
          Sell
        </button>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <p className="font-sarala text-sm w-full text-neutral-100 mb-2">
            Full Name
          </p>
          <label htmlFor="name" className="sr-only">
            Full Name
          </label>
          <input
            id="full-name"
            name="full-name"
            type="text"
            autoComplete="full-name"
            height={56}
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3 py-3 rounded-[12px] bg-transparent border border-2 border-neutral-100 placeholder-gray-500 text-md outline-none text-neutral-100"
            placeholder="Full Name"
          />
        </div>
        <div>
          <p className="font-sarala text-sm w-full text-neutral-100 mb-2">
            Username
          </p>
          <label htmlFor="name" className="sr-only">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            height={56}
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-3 py-3 rounded-[12px] bg-transparent border border-2 border-neutral-100 placeholder-gray-500 text-md outline-none text-neutral-100"
            placeholder="Username"
          />
        </div>
        <div>
          <p className="font-sarala text-sm w-full text-neutral-100 mb-2">
            Email
          </p>
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
            className="w-full px-3 py-3 rounded-[12px] bg-transparent border border-2 border-neutral-100 placeholder-gray-500 text-md outline-none text-neutral-100"
            placeholder="Email"
          />
        </div>
        <div>
          <p className="font-sarala text-sm w-full text-neutral-100 mb-2">
            Password
          </p>
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
            className="w-full px-3 py-3 rounded-[12px] bg-transparent border border-2 border-neutral-100 placeholder-gray-500 text-md outline-none text-neutral-100"
            placeholder="Password"
          />
        </div>
        <div>
          <p className="font-sarala text-sm w-full text-neutral-100 mb-2">
            Phone Number
          </p>
          <label htmlFor="phone-number" className="sr-only">
            Phone Number
          </label>
          <input
            id="phone-number"
            name="phone-number"
            type="text"
            autoComplete="phone-number"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-3 py-3 rounded-[12px] bg-transparent border border-2 border-neutral-100 placeholder-gray-500 text-md outline-none text-neutral-100"
            placeholder="Phone Number"
          />
        </div>
        <div>
          <p className="font-sarala text-sm w-full text-neutral-100 mb-2">
            Address
          </p>
          <label htmlFor="address" className="sr-only">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            autoComplete="address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-3 rounded-[12px] bg-transparent border border-2 border-neutral-100 placeholder-gray-500 text-md outline-none text-neutral-100"
            placeholder="Address"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full px-3 py-3 rounded-[12px] bg-blue-500 font-sarala text-2xl text-neutral-100 hover:bg-blue-300 transition-all
            "
          >
            Sign up
          </button>
        </div>
      </form>
      {modal && (
        <Modal
          cancel={() => setModal(false)}
          confirm={() => router.push("/login", { scroll: false })}
          title={"Notification"}
          content={"Successfully create your account"}
          confirmText={"Login now"}
        />
      )}
    </div>
  );
};

export default RegisterCard;
