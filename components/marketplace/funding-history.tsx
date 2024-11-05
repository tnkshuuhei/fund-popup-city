"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePagination } from "@/hooks/use-pagination";
import { truncateEthereumAddress } from "@/lib/utils";
import type { Sales } from "@/marketplace/types";
import { ShowingDisplay, VDPaginator } from "../global/vd-paginator";
import { FormattedUnits } from "./formatted-units";

export default function FundingHistory({
	sales,
	creatorAddress,
}: {
	sales: Sales[];
	creatorAddress: string;
}) {
	const filteredSales = sales.filter(
		(sale) => sale.seller.toLowerCase() === creatorAddress,
	);
	console.log("filteredSales", filteredSales);

	const itemsPerPage = 5;
	const {
		currentPage,
		currentPageItems: pageSales,
		loadPage,
		maxPage,
		needsPagination,
	} = usePagination<Sales>(filteredSales, itemsPerPage);

	const formatDate = (timestamp: string) => {
		const date = new Date(Number(timestamp) * 1000);
		return date.toLocaleDateString("en-En", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<Card className="mt-6">
			<CardHeader>
				<CardTitle className="line-clamp-none font-semibold text-xl leading-none tracking-tight">
					Funding history
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{pageSales.map((sale) => (
						<div
							key={sale.id}
							className="flex flex-col space-y-2 rounded-lg border border-slate-200 p-4 transition-colors hover:bg-slate-50"
						>
							<div className="flex flex-row items-center justify-between">
								<div className="flex flex-row items-center gap-2">
									<span className="text-slate-500 text-sm">
										{truncateEthereumAddress(sale.buyer as `0x${string}`)}
									</span>
									<span className="text-slate-500 text-sm">bought</span>
									<span className="text-slate-500 text-sm">
										<FormattedUnits>
											{sale.amounts && (sale.amounts[0] as number)}
										</FormattedUnits>
									</span>
								</div>
								<span className="text-slate-600 text-sm">
									{formatDate(sale.creation_block_timestamp as string)}
								</span>
							</div>
						</div>
					))}
					{filteredSales.length === 0 && (
						<div className="py-4 text-center text-slate-500">
							No funding history found
						</div>
					)}
				</div>

				{needsPagination && (
					<section className="mt-4 flex flex-col items-center justify-center gap-2">
						<VDPaginator
							needsPagination={needsPagination}
							currentPage={currentPage}
							maxPage={maxPage}
							loadPage={loadPage}
						/>
						<ShowingDisplay
							currentPage={currentPage}
							totalItemAmount={filteredSales.length}
							itemsPerPage={itemsPerPage}
						/>
					</section>
				)}
			</CardContent>
		</Card>
	);
}

export const mockSales: Sales[] = [
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["44"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["1"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["100"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["100"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["44"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["1"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["100"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["100"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["44"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["1"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["100"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["100"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["44"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["1"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["100"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["100"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["44"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["1"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["100"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["100"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
	{
		seller: "0xc3593524E2744E547f013E17E6b0776Bc27Fc614",
		item_ids: ["239558786312340678278215723631964820865024"],
		collection: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
		id: "825beea7-4f9a-41c0-8b88-0a89f5387d2c",
		currency: "0x0000000000000000000000000000000000000000",
		amounts: ["50000000"],
		buyer: "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669",
		creation_block_timestamp: "1730535228",
	},
];
