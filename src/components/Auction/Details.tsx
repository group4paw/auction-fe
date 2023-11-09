export default function AuctionDetailComp() {
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
            <p>Canvas</p>
            <p>120cm x 86cm</p>
            <p>Oak</p>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col gap-2 text-neutral-500 text-[16px] mr-20">
            <p>Send from</p>
            <p>Estimated delivery</p>
            <p>Weight</p>
          </div>
          <div className="flex flex-col gap-3 text-neutral-100 text-[16px]">
            <p>Semarang</p>
            <p>3 days</p>
            <p>2,4 KG</p>
          </div>
        </div>
      </div>
    </div>
  );
}
