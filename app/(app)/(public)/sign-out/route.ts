import { createSupabaseForRouteHandler } from "@/lib/supabase.server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const supabase = createSupabaseForRouteHandler();
	await supabase.auth.signOut();

	return NextResponse.redirect(new URL("/", request.url), { status: 302 });
}
