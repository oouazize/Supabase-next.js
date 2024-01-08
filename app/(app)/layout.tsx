import { env } from "@/lib/env.server";
import Script from "next/script";
import "@/app/globals.css";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

export default async function Layout({ children }: React.PropsWithChildren) {
	return (
		<>{children}</>

		/* <Script
					src={`https://www.googletagmanager.com/gtag/js?id=${env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
				/>
				<Script id="google-analytics">
					{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
        `}
				</Script> */
	);
}
