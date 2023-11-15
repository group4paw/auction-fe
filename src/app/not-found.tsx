import Image404 from "@/assets/icons/404.svg";
import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <>
      <div className="font-sarala text-white flex justify-center items-center w-screen min-h-[80vh]">
        <div className="w-1/2 flex flex-col items-center justify-center">
          <Image
            src={Image404}
            alt="404"
            sizes="100vw"
            style={{
              width: "70%",
              height: "auto",
            }}
          />
          <h6 className="font-bold ">Oopps I think you’re lost! </h6>
          <p className="mt-2 mb-4 text-[18px]">We cannot find the page</p>
          <Link href="/">
            <button className="text-[18px] px-3 py-2 bg-blue-500 rounded-2xl">
              Go back to homepage
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
