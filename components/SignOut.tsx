import { createSupabaseForServerAction } from "@/lib/supabase.server";
import { redirect } from "next/navigation";
import React from "react";

export default function SignOut() {
	const logout = async () => {
		"use server";
		const supabase = createSupabaseForServerAction();
		await supabase.auth.signOut();
		redirect("/login");
	};
	return (
		<form action={logout}>
			<button className="black_btn">Sign Out</button>
		</form>
	);
}
