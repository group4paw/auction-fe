"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "@/redux/features/auth-slice";
import axios from "axios";
import { Image } from "next/dist/client/image-component";
import EasyBidImg from "@/assets/logo/EasyBid.svg";
import { useRouter } from "next/navigation";

const LoginCard = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [response, setResponse] = useState<number | undefined>();
	const router = useRouter();

	const disp = useDispatch();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		await axios
			.post("https://auction-api-4.vercel.app/customer/signin", {
				email: email,
				password: password,
			})
			.then((res) => {
				console.log(res.data.customer);
				disp(logIn({ user: res.data.customer, role: res.data.role }));
				localStorage.setItem("user", JSON.stringify(res.data.customer));
				localStorage.setItem("role", res.data.role);
				if (res.data.role == "buyer") {
					router.push("/buy");
				} else {
					router.push("/sell");
				}
			})
			.catch((error) => {
				setResponse(error.response.status);
			});
	};

	useEffect(() => {
		if (localStorage.getItem("user")) {
			if (localStorage.getItem("role") == "buyer") {
				router.push("/buy", { scroll: false });
			} else {
				router.push("/sell", { scroll: false });
			}
		}
	});
	return (
		<div className="max-w-sm w-full bg-shade-500 p-8 rounded-2xl">
			<div className="flex justify-center">
				<Image src={EasyBidImg} width={0} height={44} alt="" className="flex" />
			</div>
			<form className="mt-4 space-y-6" onSubmit={handleSubmit}>
				<input type="hidden" name="remember" value="true" />
				<div>
					<label htmlFor="email-address" className="sr-only">
						Email
					</label>
					<input
						id="email-address"
						name="email"
						type="email"
						autoComplete="email"
						height={56}
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full px-3 py-3 rounded-[12px] bg-transparent border border-2 border-neutral-100 placeholder-gray-500 text-lg outline-none text-neutral-100"
						placeholder="Email"
					/>
				</div>
				<div>
					<label htmlFor="password" className="sr-only">
						Password
					</label>
					<input
						id="password"
						name="password"
						type="password"
						autoComplete="current-password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-3 py-3 rounded-[12px] bg-transparent border border-2 border-neutral-100 placeholder-gray-500 text-lg outline-none text-neutral-100"
						placeholder="Password"
					/>
				</div>

				<div>
					<button
						type="submit"
						className="w-full px-3 py-3 rounded-[12px] bg-blue-500 font-sarala text-2xl text-neutral-100"
					>
						Sign in
					</button>
				</div>
			</form>
			{response == 401 && (
				<p className="font-sarala text-base w-full mt-3 text-alert-red">*Incorrect username or password.</p>
			)}
		</div>
	);
};

export default LoginCard;