import { createSupabaseForRouteHandler } from "@/lib/supabase.server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const supabase = createSupabaseForRouteHandler();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const user = session?.user;

	if (!user) {
		console.error("User is not authorized");
		return NextResponse.redirect(new URL("/login", request.url), { status: 302 });
	}

	const { businessName } = await request.json();

	if (!businessName)
		return NextResponse.next({
			statusText: "Business name is empty",
			status: 400,
		});

	const { error } = await supabase.from("Business").insert({
		name: businessName,
		user_id: user.id,
		user_email: user.email,
	});

	if (error)
		return NextResponse.next({ statusText: error.message, status: 500 });
	else return NextResponse.redirect(new URL("/", request.url), { status: 302 });
}

export async function PUT(request: Request) {
	const supabase = createSupabaseForRouteHandler();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user)
		return NextResponse.redirect(new URL("/login", request.url), {
			status: 302,
		});

	const { businessName, businessId } = await request.json();

	if (!businessName)
		return NextResponse.next({
			statusText: "Business name is empty",
			status: 400,
		});

	const { error } = await supabase
		.from("Business")
		.update({
			name: businessName,
			user_email: user.email,
		})
		.match({ id: businessId });

	if (error)
		return NextResponse.next({ statusText: error.message, status: 500 });
	else return NextResponse.redirect(new URL("/", request.url), { status: 302 });
}

export async function DELETE(request: Request) {
	const supabase = createSupabaseForRouteHandler();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user)
		return NextResponse.redirect(new URL("/login", request.url), {
			status: 302,
		});

	const { businessId } = await request.json();

	const { error } = await supabase
		.from("Business")
		.delete()
		.match({ id: businessId });

	if (error)
		return NextResponse.next({ statusText: error.message, status: 500 });
	else return NextResponse.redirect(new URL("/", request.url), { status: 302 });
}
