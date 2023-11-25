import Card from "./Card";

export default function ListComing({ data }: any) {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-2xl font-sarala font-bold text-white">
        Your scheduled event
      </p>
      {data.length > 0 ? (
        data.map((item: any, index: number) => <Card data={item} key={index} />)
      ) : (
        <p className="font-sarala text-sm text-neutral-300 text-center my-5">
          You have no scheduled event
        </p>
      )}
    </div>
  );
}
