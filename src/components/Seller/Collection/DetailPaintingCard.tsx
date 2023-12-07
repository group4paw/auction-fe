import Image from "next/image";

const PaintingCardDetail = ({ data }: any) => {
  return (
    <>
      <div className="w-full flex flex-col lg:flex-row rounded-xl lg:rounded-2xl overflow-hidden font-sarala mb-10 lg:mb-0">
        <img
          src={data.image || ""}
          alt=""
          className="object-cover lg:w-1/2 w-full"
        />
        <div className="flex bg-neutral-900 p-6 flex-col justify-start lg:w-1/2 w-full">
          <div className="flex-col lg:mb-5">
            <h6 className="text-[28px] text-neutral-100 my-5 font-bold">
              {data.title}
            </h6>
            <p className="text-justify lg:text-left text-[14px] text-neutral-500 mb-10 lg:mb-0 ">
              {data.description}
            </p>
          </div>
          <div className="w-full">
            <p className="text-xl text-white font-bold mb-5">Details</p>
            <div className="flex">
              <div className="w-1/2 flex items-start flex-col justify-between gap-2">
                <p className="text-lg text-neutral-500 font-normal">Medium</p>
                <p className="text-lg text-neutral-500 font-normal">
                  Dimensions
                </p>
                <p className="text-lg text-neutral-500 font-normal">Frame</p>
                <p className="text-lg text-neutral-500 font-normal">
                  Send From
                </p>
                <p className="text-lg text-neutral-500 font-normal">
                  Estimated
                </p>
                <p className="text-lg text-neutral-500 font-normal">Weight</p>
              </div>
              <div className="w-1/2 flex items-start flex-col justify-between gap-2">
                <p className="text-lg text-neutral-100 font-normal">
                  {data.medium}
                </p>
                <p className="text-lg text-neutral-100 font-normal">
                  {data.width}cm x {data.height}cm
                </p>
                <p className="text-lg text-neutral-100 font-normal">
                  {data.frame}
                </p>
                <p className="text-lg text-neutral-100 font-normal">
                  {data.cityFrom}
                </p>
                <p className="text-lg text-neutral-100 font-normal">
                  {data.estimatedDelivery ? data.estimatedDelivery : "-"} days
                </p>
                <p className="text-lg text-neutral-100 font-normal">
                  {data.weight} KG
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaintingCardDetail;
