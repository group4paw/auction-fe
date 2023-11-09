export default function AuctionDetailComp({ data }: any) {
  const painting = data.idPainting;
  return (
    <div className="mb-20">
      <p className="text-[20px] text-white font-bold mb-6">Details</p>
      <div className="flex">
        <div className="flex flex-row mr-20">
          <div className="flex flex-col gap-3 text-neutral-500 text-[16px] mr-20">
            <p>Medium</p>
            <p>Dimensions</p>
            <p>Frame</p>
          </div>
          <div className="flex flex-col gap-3 text-neutral-100 text-[16px]">
            <p>{painting?.medium}</p>
            <p>
              {painting?.width}cm x {painting?.height}cm
            </p>
            <p>{painting?.frame}</p>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col gap-2 text-neutral-500 text-[16px] mr-20">
            <p>Send from</p>
            <p>Estimated delivery</p>
            <p>Weight</p>
          </div>
          <div className="flex flex-col gap-3 text-neutral-100 text-[16px]">
            <p>{painting?.cityFrom}</p>
            <p>3 days</p>
            <p>{painting?.weight} KG</p>
          </div>
        </div>
      </div>
    </div>
  );
}
