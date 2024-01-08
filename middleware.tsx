import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "./lib/env.server";

export async function middleware(request: NextRequest) {
	// assert_origin: {
	//   const origin = new URL(request.headers.get("referer") ?? env.NEXT_PUBLIC_ORIGIN).origin;
	//   if (origin !== env.NEXT_PUBLIC_ORIGIN) {
	//     throw new Error(`You are trying to access the application from ${origin}, but the origin defined in the NEXT_PUBLIC_ORIGIN environment variable is ${env.NEXT_PUBLIC_ORIGIN}.\nYou must access the application from ${env.NEXT_PUBLIC_ORIGIN}, because some integrations will not work otherwise.`);
	//   }
	// }

	let response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	});

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return request.cookies.get(name)?.value;
				},
				set(name: string, value: string, options: CookieOptions) {
					request.cookies.set({
						name,
						value,
						...options,
					});
					response = NextResponse.next({
						request: {
							headers: request.headers,
						},
					});
					response.cookies.set({
						name,
						value,
						...options,
					});
				},
				remove(name: string, options: CookieOptions) {
					request.cookies.set({
						name,
						value: "",
						...options,
					});
					response = NextResponse.next({
						request: {
							headers: request.headers,
						},
					});
					response.cookies.set({
						name,
						value: "",
						...options,
					});
				},
			},
		}
	);

	const {
		data: { session },
	} = await supabase.auth.getSession();

	const user = session?.user;

	// Defining the protected routes
	const protectedRoutes = ["/login", "/sign-up", '/forgot-password', '/reset-password', '/verify-reset-password'];
	const protectedRoutePrefix = "/business/";
	const indexRoute = "/";
	const isProtectedRoute = protectedRoutes.includes(
		request.nextUrl.pathname
	);
	const isIndexRoute = indexRoute.includes(request.nextUrl.pathname);
	const isProtectedRoutePrefix = request.nextUrl.pathname.startsWith(protectedRoutePrefix);

	if (user && isProtectedRoute)
		return NextResponse.redirect(new URL("/", request.url));

	if (!user && (isProtectedRoutePrefix || isIndexRoute))
		return NextResponse.redirect(new URL("/login", request.url));

	return response;
}
