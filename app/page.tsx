'use server';

import Card from "@/components/Card";
import { createSupabaseForServerComponent } from "@/lib/supabase.server";

export default async function Page() {

	const supabase = createSupabaseForServerComponent();

	const { data } = await supabase.from("Business").select('*');
	console.log(data);

	return (
		<div className="w-full h-full flex-center flex-wrap gap-6">
			{data?.map((item) => (
				<Card key={item.id} data={item} />
			))}
		</div>
	);
}
