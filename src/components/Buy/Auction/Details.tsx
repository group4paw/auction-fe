export default function AuctionDetailComp({ data }: any) {
  const painting = data.idPainting;
  return (
    <div className="my-20">
      <p className="text-[20px] text-white font-bold mb-6">Details</p>
      <div className="w-full flex flex-col lg:flex-row lg:gap-0 gap-2">
        <div className="w-full flex flex-row mr-0 lg:mr-20 justify-between">
          <div className="w-1/2 lg:w-auto flex flex-col gap-3 text-neutral-500 text-[16px] mr-20">
            <p>Medium</p>
            <p>Dimensions</p>
            <p>Frame</p>
          </div>
          <div className="w-1/2 lg:w-auto flex flex-col gap-3 text-neutral-100 text-[16px]">
            <p>{painting?.medium}</p>
            <p>
              {painting?.width}cm x {painting?.height}cm
            </p>
            <p>{painting?.frame}</p>
          </div>
        </div>
        <div className="w-full flex flex-row justify-between">
          <div className="w-1/2 lg:w-auto flex flex-col gap-3 text-neutral-500 text-[16px] mr-20">
            <p>Send from</p>
            <p>Estimated delivery</p>
            <p>Weight</p>
          </div>
          <div className="w-1/2 lg:w-auto flex flex-col gap-3 text-neutral-100 text-[16px]">
            <p>{painting?.cityFrom}</p>
            <p>3 days</p>
            <p>{painting?.weight} KG</p>
          </div>
        </div>
      </div>
    </div>
  );
}
