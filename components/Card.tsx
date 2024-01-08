import { card } from "@/interfaces";
import { createSupabaseForServerComponent } from "@/lib/supabase.server";
import Link from "next/link";
import { FaPen } from "react-icons/fa";

export default async function Card({ data }: { data: card }) {
	const supabse = createSupabaseForServerComponent();

	const {
		data: { user },
	} = await supabse.auth.getUser();

	return (
		<div className="relative w-80 h-48 p-4 rounded-md flex justify-center flex-col gap-4 bg-secondary text-primary">
			<h1>Name: {data.name}</h1>
			<h2>User: {data.user_email}</h2>
			<p>Date: {data.created_at}</p>

			{user?.email === data.user_email && (
				<Link
					href={`/business/${data.id}`}
					className="absolute cursor-pointer flex-center p-2 -top-2 -right-4 rounded-full border-2 border-black bg-primary text-secondary"
				>
					<FaPen />
				</Link>
			)}
		</div>
	);
}
