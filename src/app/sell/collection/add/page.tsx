import AddArtComp from "@/components/Seller/Collection/AddArt";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";

const AddArt = () => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center lg:justify-between lg:px-24 py-12">
        <div className="z-10 lg:max-w-4xl w-[90%]  font-mono text-sm    ">
          <div className="flex justify-start mb-5">
            <Link href="/sell/collection">
              <button className="py-2 px-4 text-neutral-100 rounded-xl text-xl flex items-center gap-3 font-bold">
                <MdArrowBack />
                <p>Add new art</p>
              </button>
            </Link>
          </div>
          <div className="items-center justify-center lg:justify-center flex flex-wrap">
            <AddArtComp />
          </div>
        </div>
      </main>
    </>
  );
};

export default AddArt;
