"use client";

import { useMemo } from "react";
import type { Sales } from "@/marketplace/types";

// TODO: fetch eth price by using Moralis
// only for usd price
export function useTotalFunding(sales: Sales[], pricePerUnit: number) {
  const calculateTotalFunding = useMemo(() => {
    if (!sales || sales.length === 0) return 0;

    const total = sales.reduce((acc, sale) => {
      if (!sale.amounts || sale.amounts.length === 0) return acc;

      let saleTotal = 0;
      for (let i = 0; i < sale.amounts.length; i++) {
        const amount = Number(sale.amounts[i]);
        saleTotal += amount;
      }

      const amount = saleTotal * pricePerUnit;
      const roundedAmount = Number(amount.toFixed(2));

      console.log("Sale details:", {
        saleId: sale.id,
        amounts: sale.amounts,
        saleTotal,
        calculatedAmount: amount,
        roundedAmount,
      });

      return acc + roundedAmount;
    }, 0);

    return Number(total.toFixed(2));
  }, [sales, pricePerUnit]);

  return {
    totalFunding: calculateTotalFunding,
    isLoading: false,
  };
}
