"use client";

import { useTotalFunding } from "@/hooks/use-moralis";
import { Sales } from "@/marketplace/types";
import { DollarSign } from "lucide-react";

export function TotalFundingDisplay({ sales }: { sales: Sales[] }) {
  const pricePerUnit = 1;
  const { totalFunding } = useTotalFunding(sales, pricePerUnit);

  return (
    <div className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-800">
      <DollarSign className="mr-1 h-4 w-4" />
      Total Funding: ${totalFunding.toLocaleString()} USD
    </div>
  );
}
