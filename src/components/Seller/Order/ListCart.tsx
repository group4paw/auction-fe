"use client";

import CardOrder from "./CardOrder";

const ListCart = ({ data }: any) => {
  return (
    <div className="font-sarala w-full">
      <p className="text-[28px] text-white font-bold mb-5 ml-5 lg:ml-0">
        Your Cart
      </p>
      {data.length > 0 ? (
        data.map((item: any, index: number) => (
          <CardOrder data={item} key={index} />
        ))
      ) : (
        <div className="w-full flex justify-center">
          <p className="font-sarala text-sm text-neutral-300 text-center my-5">
            You have no item in your cart
          </p>
        </div>
      )}
    </div>
  );
};

export default ListCart;
