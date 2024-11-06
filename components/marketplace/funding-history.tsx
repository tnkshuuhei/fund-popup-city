"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePagination } from "@/hooks/use-pagination";
import type { Sales } from "@/marketplace/types";
import { ShowingDisplay, VDPaginator } from "../global/vd-paginator";
import { FormattedUnits } from "./formatted-units";
import { truncateEthereumAddress } from "@/lib/utils";

export default function FundingHistory({ sales }: { sales: Sales[] }) {
  const itemsPerPage = 5;

  const {
    currentPage,
    currentPageItems: pageSales,
    loadPage,
    maxPage,
    needsPagination,
  } = usePagination<Sales>(sales, itemsPerPage);

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
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="line-clamp-none font-semibold text-xl leading-none tracking-tight">
            Funding history
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sales.length === 0 ? (
            <div className="py-4 text-center text-slate-500">
              No funding history found
            </div>
          ) : (
            pageSales.map((sale) => (
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
            ))
          )}
        </div>

        <section className="mt-4 flex flex-col items-center justify-center gap-2">
          <VDPaginator
            needsPagination={needsPagination}
            currentPage={currentPage}
            maxPage={maxPage}
            loadPage={loadPage}
          />
          <ShowingDisplay
            currentPage={currentPage}
            totalItemAmount={sales.length}
            itemsPerPage={itemsPerPage}
          />
        </section>
      </CardContent>
    </Card>
  );
}
