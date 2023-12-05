"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Notify from "@/components/Notify";

const Checkout = () => {
  const [order, setOrder] = useState<any>([]);
  const [listCity, setListCity] = useState<any>([]);
  const [listCityName, setListCityName] = useState<any>([]);
  const [listInsurance, setListInsurance] = useState<any>([]);
  const [listInsuranceName, setListInsuranceName] = useState<any>([]);
  const [insurancePrice, setInsurancePrice] = useState<any>(0);
  const [insuranceName, setInsuranceName] = useState<any>("");
  const [ongkir, setOngkir] = useState<any>(0);
  const [phone, setPhone] = useState<any>("");
  const [address, setAddress] = useState<any>("");
  const [notify, setNotify] = useState<any>(false);
  const [error, setError] = useState<any>("");
  const pathname = usePathname();

  useEffect(() => {
    const orderId = pathname.split("/").pop();
    fetchOrder({ orderId });
    fetchListCity();
    fetchListInsurance();
  }, []);

  const fetchOrder = async ({ orderId }: any) => {
    try {
      await axios
        .get("https://auction-api-4.vercel.app/order/" + orderId)
        .then((res) => {
          setOrder(res.data.order);
        });
    } catch (err) {
      console.log(err);
    }
  };

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
          setListCityName(temp);
          setListCity(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchListInsurance = async () => {
    try {
      await axios
        .get("https://auction-api-4.vercel.app/insurance/")
        .then((res) => {
          let data = res.data.insurance;
          setListInsurance(data);
          let temp = [] as any;
          data.map((item: any) => {
            temp.push(item.name);
          });
          setListInsuranceName(temp);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOngkir = async (e: any) => {
    setAddress(e.target.value);
    let from = "";
    let to = "";
    listCity.map((item: any) => {
      if (item.city_name == order.addressFrom) {
        from = item.city_id;
      }
      if (item.city_name == e.target.value) {
        to = item.city_id;
      }
    });
    if (from == "" || to == "") {
      return;
    }
    try {
      await axios
        .post("https://auction-api-4.vercel.app/ongkir/", {
          origin: from,
          destination: to,
          weight: 1000,
          courier: "jne",
        })
        .then((res) => {
          setOngkir(res.data.rajaongkir.results[0].costs[0].cost[0].value);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayNow = async () => {
    try {
      await axios
        .put("https://auction-api-4.vercel.app/order/checkout/" + order._id, {
          phone: phone,
          shipTo: address,
          price: parseInt(ongkir + insurancePrice),
          idCustomer: order.idCustomer,
        })
        .then((res) => {
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(res.data.buyer));
          setError("Success");
          setNotify(true);
        });
    } catch (error: any) {
      setError(error.message);
      setNotify(true);
      console.log(error);
    }
  };

  const closeNotify = () => {
    setNotify(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 w-full items-start">
      <div className="flex flex-col lg:flex-row w-full bg-neutral-900 bg-opacity-30 w-[68%] gap-5 h-auto px-8 py-5 rounded-3xl flex font-sarala">
        <div className="w-[40%]">
          <p className="text-[14px] text-neutral-300 ">Ringkasan pembelian</p>
          {!order.image ? (
            <div className="flex justify-center flex-col items-center border-2 border-neutral-100 w-1/2 aspect-square rounded-xl">
              <MdOutlineAddPhotoAlternate className="text-neutral-500 text-4xl" />
              <p className="text-neutral-500 text-[12px] my-1">
                Your art photo
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-center flex-col items-center w-[80%] aspect-square rounded-xl my-2 ">
                <img src={order.image} alt="" className="rounded-xl" />
              </div>
            </>
          )}
          <div className="mb-2">
            <p className="text-[14px] text-neutral-300">Title</p>
            <p className="text-lg text-neutral-300 font-bold">{order.title}</p>
          </div>
          <div>
            <p className="text-[14px] text-neutral-300">Artist</p>
            <p className="text-lg text-neutral-300 font-bold">
              @{order.seller}
            </p>
          </div>
        </div>
        <div className="w-[60%] flex flex-col gap-3">
          <div>
            <p className="mb-2 text-lg text-neutral-500 my-2">Address</p>
            <input
              type="text"
              name="cityFrom"
              list="city"
              placeholder="Semarang, Jawa Tengah"
              onChange={handleOngkir}
              className="w-full h-[55px] whitespace-normal rounded-xl px-2 py-1 border-2 border-neutral-100 bg-transparent text-lg text-neutral-100 px-5 py-2 focus:outline-none focus:border-pink-700"
            />
            <datalist id="city">
              {listCityName.map((item: any, index: any) => (
                <option value={item} key={index} />
              ))}
            </datalist>
          </div>
          <div>
            <p className="mb-2 text-[14px] text-neutral-500 my-2">
              Phone number
            </p>
            <input
              type="text"
              name="price"
              placeholder="08xxxxxxxxxx"
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-[55px] whitespace-normal rounded-xl px-2 py-1 border-2 border-neutral-100 bg-transparent text-lg text-neutral-100 px-5 py-2 focus:outline-none focus:border-pink-700"
            />
          </div>
          <div>
            <p className="mb-2 text-[14px] text-neutral-500 my-2">Insurance</p>
            <input
              type="text"
              name="cityFrom"
              list="insurance"
              placeholder="Pilih asuransi"
              onChange={(e) => {
                listInsurance.map((item: any) => {
                  if (item.name == e.target.value) {
                    setInsurancePrice(item.price);
                  }
                });
              }}
              className="w-full h-[55px] whitespace-normal rounded-xl px-2 py-1 border-2 border-neutral-100 bg-transparent text-lg text-neutral-100 px-5 py-2 focus:outline-none focus:border-pink-700"
            />
            <datalist id="insurance">
              {listInsuranceName.map((item: any, index: any) => (
                <option value={item} key={index} />
              ))}
            </datalist>
          </div>
        </div>
      </div>
      <div className="bg-neutral-900 bg-opacity-30 w-[32%] h-auto px-5 py-8 rounded-3xl flex font-sarala flex flex-col gap-3">
        <div className="flex flex-row justify-between text-neutral-300">
          <p className="text-[14px]">Final bid price</p>
          <p className="text-lg font-bold">Rp. {order.highestBid}</p>
        </div>
        <div className="flex flex-row justify-between items-center text-neutral-300">
          <div>
            <p className="text-[14px]">Shipping</p>
            <p className="text-[12px]">
              ({order.addressFrom} - {address})
            </p>
          </div>
          <p className="text-lg font-bold">Rp. {ongkir}</p>
        </div>
        <div className="flex flex-row justify-between text-neutral-300">
          <p className="text-[14px]">Insurance {insuranceName}</p>
          <p className="text-lg font-bold">Rp. {insurancePrice}</p>
        </div>
        <div className="w-full h-[2px] bg-neutral-300"></div>
        <div className="flex flex-row justify-between text-neutral-300">
          <p className="text-[14px]">Total price</p>
          <p className="text-lg font-bold">
            Rp. {order.highestBid + ongkir + insurancePrice}
          </p>
        </div>
        <div className="flex flex-row justify-between text-neutral-300">
          <p className="text-[14px]">Already paid</p>
          <p className="text-lg font-bold">Rp. {order.highestBid}</p>
        </div>
        <div className="w-full h-[2px] bg-neutral-300"></div>

        <div className="flex flex-row justify-between text-neutral-300">
          <p className="text-[14px]">Final price</p>
          <p className="text-lg font-bold">Rp. {ongkir + insurancePrice}</p>
        </div>
        <button
          disabled={
            address == "" || phone == "" || insurancePrice == 0 || ongkir == 0
              ? true
              : false
          }
          onClick={handlePayNow}
          className="w-full whitespace-normal rounded-2xl px-2 py-1  text-lg text-neutral-100 bg-blue-500 px-5 py-2 focus:outline-none hover:bg-blue-300 transition-all disabled:bg-neutral-900 disabled:text-neutral-700 "
        >
          Pay now
        </button>
      </div>
      {notify ? (
        <Notify confirm={closeNotify} content={error} textButton="Ok" />
      ) : null}
    </div>
  );
};
export default Checkout;
