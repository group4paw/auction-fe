import Link from "next/link";
import Card from "./Card";

export default function ListActive({ data }: any) {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex justify-between items-center">
        <p className="text-2xl font-sarala font-bold text-white">
          Your live bidding
        </p>
        <Link href="/sell/event/add">
          <button className="py-2 px-5 bg-blue-500 text-neutral-100 rounded-xl text-xl">
            Add new +
          </button>
        </Link>
      </div>
      {data.length > 0 ? (
        data.map((item: any, index: number) => <Card data={item} key={index} />)
      ) : (
        <p className="font-sarala text-sm text-neutral-300 text-center my-5">
          You have no live bidding
        </p>
      )}
    </div>
  );
}
