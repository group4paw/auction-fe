"use client";

import PreviewCard from "@/components/Home/Card";
import { logIn } from "@/redux/features/auth-slice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [response, setResponse] = useState<number | undefined>();
	const router = useRouter();

	const disp = useDispatch();

	useEffect(() => {
		if (localStorage.getItem("user")) {
			router.push("/", { scroll: false });
		}
	}, []);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		await axios
			.post("https://auction-api-4.vercel.app/customer/signin", {
				email: email,
				password: password,
			})
			.then((res) => {
				console.log(res.data.customer);
				disp(logIn({ user: res.data.customer }));
				localStorage.setItem("user", JSON.stringify(res.data.customer));
				router.push("/", { scroll: false });
			})
			.catch((error) => {
				setResponse(error.response.status);
			});
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full">
				<div>
					<h2 className="text-center text-3xl font-staatliches text-6xl text-white">EASYBID</h2>
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
							className="w-full px-3 py-4 rounded-[12px] bg-transparent border border-2 border-neutral-100 placeholder-gray-500 text-2xl outline-none text-neutral-100"
							placeholder="Email address"
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
							className="w-full px-3 py-4 rounded-[12px] bg-transparent border border-2 border-neutral-100 placeholder-gray-500 text-2xl outline-none text-neutral-100"
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
				<div className="flex flex-row justify-center mt-8 text-neutral-100 font-sarala text-base w-full">
					<p>Belum punya akun?</p>
					<a className="ml-1 font-bold">Daftar di sini</a>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
