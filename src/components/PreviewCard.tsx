/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Clock from "@/assets/icons/clock.svg";
import Bookmark from "@/assets/icons/bookmark.svg";

interface PreviewCardProps {
	itemImg?: string;
	usrImg?: string;
}

const PreviewCard: React.FC<PreviewCardProps> = ({ itemImg, usrImg }) => {
	if (!itemImg) itemImg = "https://cdn.discordapp.com/attachments/906426061657604131/1147427490080505856/peakpx_1.jpg"; // "https://cdn.discordapp.com/attachments/906426061657604131/1172119383393435658/empty.png";
	if (!usrImg)
		usrImg =
			"https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // "https://cdn.discordapp.com/attachments/906426061657604131/1172130953892741150/blank-profile-picture-973460_960_720.png";
	return (
		<>
			<div className="relative">
				<span className="absolute flex justify-center align-center start-2 top-2 w-10 h-10 bg-neutral-900/50 rounded-full">
					<Image src={Bookmark} height={24} alt=""/>
				</span>
				<div className="flex flex-col rounded-lg w-80 h-96 bg-neutral-900">
					<img
						src={itemImg} //"https://cdn.discordapp.com/attachments/906426061657604131/1147427490080505856/peakpx_1.jpg"
						alt=""
						className="rounded-t-lg h-[14.5rem] object-cover"
					/>
					<div className="flex flex-col px-4">
						<div className="flex flex-row justify-between">
							<p className="text-neutral-100 font-sarala font-bold text-base my-4">Épinglé sur Musician</p>
							<img
								src={usrImg} //"https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								alt=""
								className="rounded-full h-16 w-16 object-cover -mt-8"
							/>
						</div>

						<div className="flex flex-row">
							<div className="flex-auto mb-2">
								<p className="font-sarala text-xs text-neutral-500">Highest bid</p>
								<p className="font-sarala text-sm text-neutral-100">Rp. 325.998.000</p>
							</div>
							<div className="flex-auto text-right">
								<p className="font-sarala text-xs text-neutral-500">Auction ends In</p>
								<div className="flex flex-row justify-end">
									<Image src={Clock} alt="" width={14} className="mr-1" />
									<p className="font-sarala text-sm text-neutral-100">12 : 08 : 25</p>
								</div>
							</div>
						</div>
						<button className="bg-blue-500 active:bg-blue-600 focus:ring focus:ring-blue-300 text-white font-bold rounded-xl h-8 w-full mb-3">
							<span className="text-white font-sarala font-normal text-base">Make an offer</span>
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default PreviewCard;
