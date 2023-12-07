"use client";

import Modal from "@/components/Modal";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdDelete, MdModeEditOutline, MdMoreHoriz } from "react-icons/md";

const CardArt = ({ data }: any) => {
  let imageUrl = data.image || "";
  if (!imageUrl.includes("https://")) {
    imageUrl = "https://auction-api-4.vercel.app/images/" + imageUrl;
  }

  const [modal, setModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const cancel = () => {
    setModal(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://auction-api-4.vercel.app/painting/${data._id}`
      );
      setModal(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, [openDropdown]);

  return (
    <>
      <div className="relative flex flex-col rounded-2xl w-72 h-auto bg-neutral-900 bg-opacity-50 p-3 font-sarala">
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
                  <Link
                    href={`/sell/collection/edit/${data._id}`}
                    className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white  flex"
                  >
                    <MdModeEditOutline className="text-neutral-500 text-2xl mr-2" />
                    <p className="select-none">Edit</p>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setModal(true);
                    }}
                    className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex"
                  >
                    <MdDelete className="text-neutral-500 text-2xl mr-2" />
                    <p className="select-none">Delete</p>
                  </button>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
        <Link href={`/sell/painting/${data._id}`}>
          <Image
            src={imageUrl}
            alt=""
            width={340}
            height={384}
            className="rounded-lg h-[14.5rem] object-cover cursor-pointer select-none"
          />
        </Link>
        <div className="flex flex-col">
          <p className="text-neutral-500 font-sarala font-bold text-xl my-4 overflow-hidden truncate cursor-pointer select-none">
            {data.title}
          </p>
        </div>
      </div>
      {modal ? (
        <Modal
          cancel={cancel}
          confirm={handleDelete}
          content="Are you sure want to delete this painting from your collection?"
          isCancel={true}
          confirmText="Yes"
          cancelText="No"
          title="Remove painting"
        />
      ) : null}
    </>
  );
};

export default CardArt;
