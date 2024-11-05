import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useBuyFractionalMakerAsk } from "@/marketplace/hooks";
import type { MarketplaceOrder } from "@/marketplace/types";
import { getCurrencyByAddress } from "@/marketplace/utils";
import React from "react";
import { useForm } from "react-hook-form";
import { formatEther } from "viem";

export interface BuyFractionalOrderFormValues {
	unitAmount: string;
	pricePerUnit: string;
}

export const BuyFractionalOrderForm = ({
	order,
	onCompleted,
}: {
	order: MarketplaceOrder;
	onCompleted?: () => void;
}) => {
	const form = useForm<BuyFractionalOrderFormValues>({
		defaultValues: {
			unitAmount: "0",
			pricePerUnit: formatEther(BigInt(order.price)),
		},
	});

	const { mutateAsync: buyFractionalMakerAsk } = useBuyFractionalMakerAsk();

	const currency = getCurrencyByAddress(order.chainId, order.currency);
	console.log("Currency:", currency);

	const onSubmit = async (values: BuyFractionalOrderFormValues) => {
		await buyFractionalMakerAsk({
			order,
			unitAmount: values.unitAmount,
			pricePerUnit: values.pricePerUnit,
		});
		onCompleted?.();
	};

	const unitAmount = form.watch("unitAmount");
	const pricePerUnit = form.watch("pricePerUnit");
	const totalPrice = Number(unitAmount) * Number(pricePerUnit);

	return (
		<Form {...form}>
			<FormField
				name={"unitAmount"}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input {...field} />
						</FormControl>
						<FormDescription>Number of units to buy </FormDescription>
					</FormItem>
				)}
			/>

			<FormField
				name={"pricePerUnit"}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input {...field} />
						</FormControl>
						<FormDescription>Price per unit</FormDescription>
					</FormItem>
				)}
			/>

			<span>{`Total price: ${totalPrice} ${currency?.symbol}`}</span>

			<Button
				variant={"outline"}
				type="button"
				onClick={form.handleSubmit(onSubmit)}
			>
				Execute order
			</Button>
		</Form>
	);
};
