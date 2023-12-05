"use client";

import Notify from "@/components/Notify";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Datepicker from "react-tailwindcss-datepicker";
import Link from "next/link";

const AddEventComp = () => {
  const [image, setImage] = useState(null);
  const [notify, setNotify] = useState(false);

  const [user, setUser] = useState({} as any);
  const [fetchStatus, setFetchStatus] = useState(false);
  const [painting, setPainting] = useState([] as any);
  const [isLoading, setIsLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [data, setData] = useState({
    userid: "",
    idPainting: "",
    startingPrice: 0,
    startDate: "",
    endDate: "",
    reservePrice: 0,
  });

  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  });

  const handleDateValueChange = (newValue: any) => {
    setDate(newValue);
    setData({
      ...data,
      startDate: newValue.startDate,
      endDate: newValue.endDate,
    });
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      setFetchStatus(true);
    } else {
      setUser(JSON.parse(localStorage.getItem("user") || "{}"));
      let userId = JSON.parse(localStorage.getItem("user") || "{}")._id;
      data.userid = userId;
      if (!fetchStatus) {
        fetchData(userId);
        setFetchStatus(true);
      }
    }
  }, [fetchStatus]);

  const fetchData = async (userId: any) => {
    setPainting({});
    setIsLoading(true);
    try {
      await axios
        .get("https://auction-api-4.vercel.app/painting/user/" + userId)
        .then((res) => {
          let data = res.data.paintings;
          let arr = [];
          for (let i = 0; i < data.length; i++) {
            if (!data[i].image.includes("https://")) {
              data[i].image =
                "https://auction-api-4.vercel.app/images/" + data[i].image;
            }
            arr.push({
              id: data[i]._id,
              title: data[i].title,
              image: data[i].image,
            });
          }
          console.log(arr);
          setPainting(arr);
        });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Extracting time components
    setIsLoading(true);

    let minuteStart = parseInt(startTime.split(":")[1], 10);
    let hourStart = parseInt(startTime.split(":")[0], 10);
    let minuteEnd = parseInt(endTime.split(":")[1], 10);
    let hourEnd = parseInt(endTime.split(":")[0], 10);

    const [tahunStart, bulanStart, hariStart] = data.startDate
      .split("-")
      .map(Number);
    const [tahunEnd, bulanEnd, hariEnd] = data.endDate.split("-").map(Number);

    let offset = new Date().getTimezoneOffset();
    let offsetHours = Math.abs(offset / 60);

    const newStartDate = new Date(
      tahunStart,
      bulanStart - 1,
      hariStart,
      hourStart + offsetHours,
      minuteStart
    ).toISOString();
    const newEndDate = new Date(
      tahunEnd,
      bulanEnd - 1,
      hariEnd,
      hourEnd + offsetHours,
      minuteEnd
    ).toISOString();

    data.startDate = newStartDate;
    data.endDate = newEndDate;

    console.log(data);

    try {
      await axios
        .post("https://auction-api-4.vercel.app/auction/", data)
        .then((res) => {
          console.log(res);
          setNotify(true);
        });
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  const closeNotify = () => {
    setNotify(false);
  };

  return (
    <>
      {!isLoading ? (
        <>
          <form
            id="form"
            onSubmit={handleSubmit}
            className="bg-neutral-900 bg-opacity-30 w-full h-auto px-8 py-5 rounded-3xl flex flex-col lg:flex-row font-sarala"
          >
            <div className="w-full lg:w-[45%]">
              <div className="relative">
                <p className="mb-2 text-lg text-neutral-500 my-2">
                  Choose your art
                </p>
                <input
                  type="text"
                  name="painting"
                  list="paintings"
                  onChange={(e) => {
                    let datafilter = painting.filter((item: any) => {
                      return item.title === e.target.value;
                    });
                    if (datafilter && datafilter.length > 0) {
                      setImage(datafilter[0].image);
                      setData({ ...data, idPainting: datafilter[0].id });
                    } else {
                      setImage(null);
                      setData({ ...data, idPainting: "" });
                    }
                  }}
                  placeholder="Choose from collection"
                  className="w-full h-[55px] whitespace-normal rounded-xl px-2 py-1 border-2 border-neutral-100 bg-transparent text-xl text-neutral-100 px-5 py-2 focus:outline-none focus:border-pink-700"
                />
                <datalist id="paintings">
                  {painting.length > 0
                    ? painting.map((item: any, index: any) => (
                        <option value={item.title} key={index} />
                      ))
                    : null}
                </datalist>
              </div>
              <div className="my-5">
                <p className="mb-2 text-lg text-neutral-500">Preview</p>
                {!image ? (
                  <div className="flex justify-center flex-col items-center border-2 border-neutral-100 w-1/2 aspect-square rounded-xl">
                    <MdOutlineAddPhotoAlternate className="text-neutral-500 text-4xl" />
                    <p className="text-neutral-500 text-[12px] my-1">
                      Your art photo
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-center flex-col items-center w-full aspect-square rounded-xl">
                      <img src={image} alt="" className="rounded-xl" />
                    </div>
                  </>
                )}
              </div>
              <div>
                <p className="mb-2 text-lg text-neutral-500 my-2">
                  Start price
                </p>
                <input
                  type="text"
                  name="price"
                  placeholder="Rp 1.000.000"
                  onChange={(e) => {
                    setData({
                      ...data,
                      startingPrice: parseInt(e.target.value),
                    });
                  }}
                  className="w-full h-[55px] whitespace-normal rounded-xl px-2 py-1 border-2 border-neutral-100 bg-transparent text-xl text-neutral-100 px-5 py-2 focus:outline-none focus:border-pink-700"
                />
              </div>
            </div>
            <div className="w-[5%]"></div>
            <div className="w-full lg:w-[45%]">
              <div className="inputDate">
                <p className="mb-2 text-lg text-neutral-500 my-2">
                  Start Date - End Date
                </p>
                {/* <input
              type="text"
              placeholder="When your event will occur"
              name="start-date"
              className="w-full h-[55px] whitespace-normal rounded-xl px-2 py-1 border-2 border-neutral-100 bg-transparent text-xl text-neutral-100 px-5 py-2 focus:outline-none focus:border-pink-700"
            /> */}
                <Datepicker
                  primaryColor={"blue"}
                  value={date as any}
                  onChange={handleDateValueChange}
                />
              </div>
              <div className="my-5">
                <p className="mb-2 text-lg text-neutral-500 my-2">
                  Start Time (eg : 20:00)
                </p>
                <input
                  type="text"
                  name="start-time"
                  onChange={(e) => {
                    setStartTime(e.target.value);
                  }}
                  placeholder="What time it’s started"
                  className="w-full h-[55px] whitespace-normal rounded-xl px-2 py-1 border-2 border-neutral-100 bg-transparent text-xl text-neutral-100 px-5 py-2 focus:outline-none focus:border-pink-700"
                />
              </div>
              <div>
                <p className="mb-2 text-lg text-neutral-500 my-2">
                  Stop time (eg : 20:00)
                </p>
                <input
                  type="text"
                  placeholder="What time it’s done"
                  name="stop-time"
                  onChange={(e) => {
                    setEndTime(e.target.value);
                  }}
                  className="w-full h-[55px] whitespace-normal rounded-xl px-2 py-1 border-2 border-neutral-100 bg-transparent text-xl text-neutral-100 px-5 py-2 focus:outline-none focus:border-pink-700"
                />
              </div>
              <div className="mt-5">
                <input
                  type="submit"
                  value="Upload now"
                  className="w-full bg-blue-500 px-5 py-2 rounded-xl text-neutral-100 font-sarala text-xl cursor-pointer
              hover:bg-blue-600 transition duration-100 ease-in-out"
                />
              </div>
            </div>
          </form>
        </>
      ) : (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-neutral-100"></div>
        </div>
      )}
      {notify ? (
        <Notify
          confirm={closeNotify}
          content="Success upload your event"
          textButton="Ok"
        />
      ) : null}
    </>
  );
};

export default AddEventComp;
