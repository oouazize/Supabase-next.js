"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupUsingPassword } from "@/lib/supabase.auth.client";

export default function Page() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fullName, setFullName] = useState("");

	const handleEmailSignUp = async () => {
		const { error } = await signupUsingPassword({
			full_name: fullName,
			email,
			password,
		});
		if (!error) router.push("/confirm-your-email"); // Redirect to dashboard after successful sign-up
	};

	return (
		<div className="w-full">
			<h1>Authentication Page</h1>
			<section>
				{/* Email Sign-Up Form */}
				<div className="flex flex-col gap-4">
					<h2>Email Sign-Up</h2>
					<input
						className="form_input"
						type="text"
						placeholder="Full Name"
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
					/>
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
					<button className="black_btn" onClick={handleEmailSignUp}>
						Sign Up
					</button>
				</div>
			</section>
		</div>
	);
}
