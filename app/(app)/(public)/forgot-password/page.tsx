"use client";
import { supabaseForClientComponent } from "@/lib/supabase.client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
	const [email, setEmail] = useState("");
	const router = useRouter();
	const handleForgetPassword = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const { error } = await supabaseForClientComponent.auth.resetPasswordForEmail(email);
		if (error) toast.error(error.message);
		else router.push("/reset-password");
	};
	return (
		<div className="w-full">
			<h1>Forgot password</h1>
			<form
				className="w-full h-full flex flex-col gap-6"
				onSubmit={(e) => handleForgetPassword(e)}
			>
				<input
					className="form_input"
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value.trim())}
				/>
				<input
					type="submit"
					className="black_btn cursor-pointer"
					value="Reset Password"
				/>
			</form>
		</div>
	);
}
