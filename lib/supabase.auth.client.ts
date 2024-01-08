"use client";

import { env } from "@/lib/env.client";
import { supabaseForClientComponent } from "@/lib/supabase.client";
import * as Supabase from "@supabase/supabase-js";

export async function authenticateUsingGoogle() {
	const redirectTo = `${env.NEXT_PUBLIC_ORIGIN}/api/supabase/auth/callback`;

	return await supabaseForClientComponent.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo,
			queryParams: {
				access_type: "offline",
				prompt: "consent",
			},
			// scopes: "https://www.googleapis.com/auth/drive.file"
		},
	});
}

export async function authenticateUsingPassword(
	credentials: Supabase.SignInWithPasswordCredentials
) {
	return await supabaseForClientComponent.auth.signInWithPassword(credentials);
}

export async function signupUsingPassword(props: {
	full_name: string;
	email: string;
	password: string;
}) {
	return await supabaseForClientComponent.auth.signUp({
		email: props.email,
		password: props.password,
		options: {
			data: {
				full_name: props.full_name,
			},
		},
	});
}
