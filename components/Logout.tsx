"use client";
import { supabaseForClientComponent } from "@/lib/supabase.client";
import { redirect, useRouter } from "next/navigation";

export default function Logout() {
	const router = useRouter();
	async function handleLogout() {
		const { error } = await supabaseForClientComponent.auth.signOut();
		if (!error) router.push("/login");
	}
	return (
		<button className="black_btn" onClick={handleLogout}>
			Logout
		</button>
	);
}
