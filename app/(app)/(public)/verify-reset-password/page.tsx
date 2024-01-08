"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseForClientComponent } from "@/lib/supabase.client";
import toast from "react-hot-toast";

export default function Page() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const handleUpdateEmail = async () => {
		const { error } = await supabaseForClientComponent.auth.updateUser({
			password,
		});
		if (!error) router.push("/");
		else toast.error(error.message);
	};

	return (
		<div className="w-full">
			<h1>Update your password</h1>
			<section>
				<div className="flex flex-col gap-4">
					<input
						className="form_input"
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value.trim())}
					/>
					<input
						className="form_input"
						type="password"
						placeholder="New Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className="black_btn" onClick={handleUpdateEmail}>
						Update
					</button>
				</div>
			</section>
		</div>
	);
}
