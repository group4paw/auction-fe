import Image from "next/image";

import HeroImg from "@/assets/image/hero.svg";

export default function Hero() {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-around items-center h-auto lg:h-[80vh] ">
        <div className="flex flex-col justify-center lg:justify-start lg:h-auto h-[80vh] px-5 lg:px-0">
          <h3 className="lg:block hidden font-bold text-left text-white font-staatliches">
            Discover, Collect, and Sell <br />
            Astonishing Arts
          </h3>
          <h3 className="block lg:hidden font-bold text-left text-white font-staatliches">
            Discover, Collect, and Sell Astonishing Arts
          </h3>
          <p className="text-[20px] text-left text-neutral-500 my-5">
            The largest live bidding art marketplace in the world!
          </p>
          <button className="w-[150px] text-[20px] inline-block bg-blue-500 px-2 py-2 rounded-2xl text-neutral-100">
            Explore Now
          </button>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image
            src={HeroImg}
            alt="hero"
            width={0}
            height={0}
            sizes="100vw"
            className="w-[80%] h-auto lg:w-full lg:h-auto"
          />
        </div>
      </div>
    </>
  );
}
