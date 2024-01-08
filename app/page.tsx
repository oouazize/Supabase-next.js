import Card from "@/components/Card";
import { createSupabaseForServerComponent } from "@/lib/supabase.server";

export default async function Page() {

	const supabase = createSupabaseForServerComponent();

	const { data } = await supabase.from("Business").select('*');

	return (
		<div className="w-full h-full flex flex-wrap gap-6">
			{data?.map((item) => (
				<Card key={item.id} data={item} />
			))}
		</div>
	);
}