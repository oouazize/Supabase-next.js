"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
	authenticateUsingGoogle,
	authenticateUsingPassword,
} from "@/lib/supabase.auth.client";
import toast from "react-hot-toast";

export default function Page() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleGoogleSignIn = async () => {
		const res = await authenticateUsingGoogle();
		router.push("/");
	};

	const handleEmailSignIn = async () => {
		const { error } = await authenticateUsingPassword({ email, password });
		!error ? router.push("/") : toast.error(error.message);
	};

	return (
		<div className="w-full">
			<h1>Authentication Page</h1>
			<section>
				{/* Google Sign-In Button */}
				<button className="black_btn" onClick={handleGoogleSignIn}>
					Sign In with Google
				</button>

				{/* Email Sign-In Form */}
				<div className="flex flex-col gap-4">
					<h2>Email Sign-In</h2>
					<input
						className="form_input"
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						className="form_input"
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className="black_btn" onClick={handleEmailSignIn}>
						Sign In
					</button>
				</div>
			</section>
		</div>
	);
}
