"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function Form({ id }: { id?: string }) {
	const [businessName, setBusinessName] = useState("");
	const router = useRouter();

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!businessName) {
			toast.error("Business name is required");
			return;
		}
		try {
			const method = id ? "PUT" : "POST";
			const data = id ? { businessName, businessId: id } : { businessName };
			const response = await fetch("/business", {
				method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			if (!response.ok) toast.error(response.statusText);
			else {
				router.push(response.url);
				router.refresh();
			}
		} catch (error) {
			console.error("Error insering business:", error);
		}
	};

	const handleDelete = async () => {
		try {
			const response = await fetch("/business", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ businessId: id }),
			});

			if (!response.ok) {
				toast.error(response.statusText);
			} else {
				router.push(response.url);
			}
		} catch (error) {
			console.error("Error deleting business:", error);
		}
	};

	return (
		<form
			action="/business"
			method="post"
			onSubmit={(e) => handleSubmit(e)}
			className="w-full h-full flex flex-col gap-6"
		>
			<input
				onChange={(e) => setBusinessName(e.target.value.trim())}
				className="form_input"
				placeholder="Business name"
			/>
			<div className="flex-between">
				<input
					type="submit"
					className="black_btn cursor-pointer"
					value="Save"
				/>
				<div className="flex gap-2">
					{id && (
						<button type="button" onClick={handleDelete} className="black_btn">
							Delete
						</button>
					)}
					<Link href="/" className="outline_btn">
						Cancel
					</Link>
				</div>
			</div>
		</form>
	);
}
