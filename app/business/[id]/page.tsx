import Form from "@/components/Form";
import { createSupabaseForServerComponent } from "@/lib/supabase.server";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
	const supabase = createSupabaseForServerComponent();

	const { data: { user } } = await supabase.auth.getUser();
	const { data } = await supabase
		.from("Business")
		.select("user_id")
		.match({ id: params.id })
		.eq("user_id", user?.id);

	// If the business is not owned by the user, then
	if (!data?.length) redirect("/");
	return (
		<div className="w-full max-w-md h-full">
			<h1>Edit Business</h1>
			<Form id={params.id} />
		</div>
	);
}
