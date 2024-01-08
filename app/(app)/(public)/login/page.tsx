"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
	authenticateUsingGoogle,
	authenticateUsingPassword,
} from "@/lib/supabase.auth.client";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Page() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleGoogleSignIn = async () => {
		await authenticateUsingGoogle();
	};

	const handleEmailSignIn = async () => {
		const { error } = await authenticateUsingPassword({ email, password });
		if (!error) {
			router.push("/");
			router.refresh();
		} else toast.error(error.message);
	};

	return (
		<div className="w-full">
			<h1>Authentication Page</h1>
			<section>
				{/* Email Sign-In Form */}
				<div className="flex-center flex-col gap-4">
					<h2>Sign In</h2>
					{/* Google Sign-In Button */}
					<button className="w-full black_btn" onClick={handleGoogleSignIn}>
						Sign In with Google
					</button>
					<p>or</p>
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
					<button className="w-full black_btn" onClick={handleEmailSignIn}>
						Sign In
					</button>
					<Link href="/forgot-password/">Forget Password ?</Link>
					<Link href="/sign-up" className="outline_btn">
						Sign Up
					</Link>
				</div>
			</section>
		</div>
	);
}
