"use client";

import Notify from "@/components/Notify";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import type { PutBlobResult } from "@vercel/blob";
import { parse } from "path";

const AddArtComp = () => {
  const [image, setImage] = useState(null);
  const [fileImage, setFileImage] = useState<any>(null);
  const [notify, setNotify] = useState(false);

  const [listCity, setListCity] = useState([] as any);
  const [user, setUser] = useState({} as any);

  let data = {
    title: "",
    description: "",
    medium: "",
    width: 0,
    height: 0,
    frame: "",
    weight: 0,
    cityFrom: "",
    estimatedDelivery: "",
    image: "",
    sellerId: "",
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
    } else {
      setUser(JSON.parse(localStorage.getItem("user") || "{}"));
      let userId = JSON.parse(localStorage.getItem("user") || "{}")._id;
      fetchListCity();
    }
  }, []);

  const fetchListCity = async () => {
    try {
      await axios
        .get("https://auction-api-4.vercel.app/ongkir", {
          headers: {
            key: "2b8e86f4b50a9bb654ab2f3a48ceb402",
          },
        })
        .then((res) => {
          let data = res.data.rajaongkir.results;
          let temp = [] as any;
          data.map((item: any) => {
            temp.push(item.city_name);
          });
          setListCity(temp);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputImage = (e: any) => {
    const file = e.target.files[0];
    setFileImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result as any);
    };
  };

  const handleFileInputBlur = () => {
    // Handle the case when the file input loses focus (cancel action)
    // and the user has not selected a file
    if (!image) {
      setImage(null);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = document.getElementById("form") as any;

    let urlImage = "";

    if (fileImage) {
      const response = await fetch(`/api/images?filename=${fileImage.name}`, {
        method: "POST",
        body: fileImage,
      });
      const newBlob = (await response.json()) as PutBlobResult;
      urlImage = newBlob.url;
    }

    data.image = urlImage;
    data.sellerId = user._id;

    try {
      await axios
        .post("https://auction-api-4.vercel.app/painting/create", data)
        .then((res) => {
          console.log(res);
          setNotify(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const closeNotify = () => {
    setNotify(false);
  };

  return (
    <>
      <form
        id="form"
        onSubmit={handleSubmit}
        className="bg-neutral-900 bg-opacity-30 w-full h-auto px-8 py-5 rounded-3xl flex lg:flex-row flex-col font-sarala"
      >
        <div className="w-full lg:w-[45%]">
          <div>
            <p className="mb-2 text-lg text-neutral-500">Upload your art</p>
            {!image ? (
              <label
                className="flex justify-center flex-col items-center border-2 border-neutral-100 w-1/3 aspect-square rounded-xl"
                htmlFor="fileInput"
              >
                <MdOutlineAddPhotoAlternate className="text-neutral-500 text-4xl" />
                <p className="text-neutral-500 text-[12px] my-1">
                  Your art photo
                </p>
                {/* Add an invisible file input */}
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={handleInputImage}
                  onBlur={handleFileInputBlur}
                />
              </label>
            ) : (
              <>
                <div className="flex justify-center flex-col items-center w-1/2 aspect-square rounded-xl">
                  <img src={image} alt="" className="rounded-xl" />

                  <label
                    className="bg-pink-700 text-neutral-100 rounded-xl px-2 py-1 text-sm my-2"
                    htmlFor="fileInput"
                  >
                    Change photo
                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      onChange={handleInputImage}
                    />
                  </label>
                </div>
              </>
            )}
          </div>
          <div>
            <p className="mb-2 text-lg text-neutral-500 my-2">Title</p>
            <input
              type="text"
              name="title"
              onChange={(e) => (data.title = e.target.value)}
              className="w-full h-[55px] whitespace-normal rounded-xl px-2 py-1 border-2 border-neutral-100 bg-transparent text-xl text-neutral-100 px-5 py-2 focus:outline-none focus:border-pink-700"
            />
          </div>
          <div>
            <p className="mb-2 text-lg text-neutral-500 my-2">Description</p>
            <textarea
              name="description"
              onChange={(e) => (data.description = e.target.value)}
              className="resize-none w-full h-[150px] whitespace-normal rounded-xl px-2 py-1 border-2 border-neutral-100 bg-transparent text-xl text-neutral-100 px-5 py-2 focus:outline-none focus:border-pink-700"
            />
          </div>
          <div>
            <p className="mb-2 text-lg text-neutral-500 my-2">Medium</p>
            <input
              type="text"
              name="medium"
              onChange={(e) => (data.medium = e.target.value)}
              className="w-full h-[55px] whitespace-normal rounded-xl px-2 py-1 border-2 border-neutral-100 bg-transparent text-xl text-neutral-100 px-5 py-2 focus:outline-none focus:border-pink-700"
            />
          </div>
        </div>
        <div className="w-[5%]"></div>
        <div className="w-full lg:w-[45%]">
          <div>
            <p className="mb-2 text-lg text-neutral-500 my-2">
              Dimension (cm){" "}
            </p>
            <div className="flex justify-between items-center">
              <input
                type="text"
                name="width"
                placeholder="width"
                onChange={(e) => (data.width = parseInt(e.target.value))}
                className="w-full h-[55px] whitespace-normal rounded-xl px-2 py-1 border-2 border-neutral-100 bg-transparent text-xl text-neutral-100 px-5 py-2 focus:outline-none focus:border-pink-700"
              />
              <p className="text-xl text-neutral-500 mx-4">x</p>
              <input
                type="text"
                name="height"
                placeholder="height"
                onChange={(e) => (data.height = parseInt(e.target.value))}
                className="w-full h-[55px] whitespace-normal rounded-xl px-2 py-1 border-2 border-neutral-100 bg-transparent text-xl text-neutral-100 px-5 py-2 focus:outline-none focus:border-pink-700"
              />
            </div>
          </div>
          <div>
            <p className="mb-2 text-lg text-neutral-500 my-2">Frame</p>
            <input
              type="text"
              name="frame"
              onChange={(e) => (data.frame = e.target.value)}
              className="w-full h-[55px] whitespace-normal rounded-xl px-2 py-1 border-2 border-neutral-100 bg-transparent text-xl text-neutral-100 px-5 py-2 focus:outline-none focus:border-pink-700"
            />
          </div>
          <div>
            <p className="mb-2 text-lg text-neutral-500 my-2">Weight (kg)</p>
            <input
              type="text"
              name="weight"
              onChange={(e) => (data.weight = parseInt(e.target.value))}
              className="w-full h-[55px] whitespace-normal rounded-xl px-2 py-1 border-2 border-neutral-100 bg-transparent text-xl text-neutral-100 px-5 py-2 focus:outline-none focus:border-pink-700"
            />
          </div>
          <div>
            <p className="mb-2 text-lg text-neutral-500 my-2">Address city</p>
            <input
              type="text"
              name="cityFrom"
              list="city"
              onChange={(e) => (data.cityFrom = e.target.value)}
              className="w-full h-[55px] whitespace-normal rounded-xl px-2 py-1 border-2 border-neutral-100 bg-transparent text-xl text-neutral-100 px-5 py-2 focus:outline-none focus:border-pink-700"
            />
            <datalist id="city">
              {listCity.map((item: any, index: any) => (
                <option value={item} key={index} />
              ))}
            </datalist>
          </div>
          <div>
            <p className="mb-2 text-lg text-neutral-500 my-2">
              Estimated Delivery (days)
            </p>
            <input
              type="text"
              name="estimatedDelivery"
              onChange={(e) => (data.estimatedDelivery = e.target.value)}
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
      {notify ? (
        <Notify
          confirm={closeNotify}
          content="Success upload your art"
          textButton="Ok"
        />
      ) : null}
    </>
  );
};

export default AddArtComp;
