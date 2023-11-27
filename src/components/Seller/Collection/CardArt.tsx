"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MdDelete, MdModeEditOutline, MdMoreHoriz } from "react-icons/md";

const CardArt = ({ data }: any) => {
  let imageUrl = data.image || "";
  if (!imageUrl.includes("https://")) {
    imageUrl = "https://auction-api-4.vercel.app/images/" + imageUrl;
  }

  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {}, [openDropdown]);

  return (
    <>
      <div className="relative flex flex-col rounded-2xl w-72 h-auto bg-neutral-900 bg-opacity-50 p-3 ">
        <div className="relative w-full flex flex-row items-center justify-end">
          <div
            onClick={() => {
              setOpenDropdown(!openDropdown);
            }}
            className="cursor-pointer"
          >
            <MdMoreHoriz className="text-neutral-500 text-3xl float-right" />
          </div>
          {openDropdown ? (
            <div
              id="dropdown"
              className={`z-10 absolute top-[30px] divide-y divide-gray-100 rounded-lg shadow w-auto bg-neutral-700 }`}
            >
              <ul
                className="py-2 text-lg text-neutral-500"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white  flex"
                  >
                    <MdModeEditOutline className="text-neutral-500 text-2xl mr-2" />
                    <p className="select-none">Edit</p>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex"
                  >
                    <MdDelete className="text-neutral-500 text-2xl mr-2" />
                    <p className="select-none">Delete</p>
                  </a>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
        <Image
          src={imageUrl}
          alt=""
          width={340}
          height={384}
          className="rounded-lg h-[14.5rem] object-cover cursor-pointer select-none"
        />
        <div className="flex flex-col">
          <p className="text-neutral-500 font-sarala font-bold text-xl my-4 overflow-hidden truncate cursor-pointer select-none">
            {data.title}
          </p>
        </div>
      </div>
    </>
  );
};

export default CardArt;
