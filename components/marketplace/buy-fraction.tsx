import BuyFractionDialog from "@/components/marketplace/buy-fraction-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { truncateEthereumAddress } from "@/lib/utils";
import { getOpenOrders } from "@/marketplace/getOpenOrders";
import { getCurrencyByAddress } from "@/marketplace/utils";
import React from "react";
import type { Address } from "viem";
import { decodeAbiParameters, formatEther, parseAbiParameters } from "viem";

const parseAdditionalParameters = (additionalParameters: Address) => {
  const [unitAmount, maxUnitsToBuy] = decodeAbiParameters(
    parseAbiParameters("uint256 a, uint256 b, uint256 c, uint256 d"),
    additionalParameters
  );
  return {
    unitAmount: unitAmount.toString(),
    maxUnitsToBuy: maxUnitsToBuy.toString(),
  };
};

async function BuyFraction({ hypercertId }: { hypercertId: string }) {
  const allOrders = await getOpenOrders(hypercertId);

  const validOrders = allOrders?.filter((order) => !order.invalidated) || [];

  if (!validOrders || validOrders.length === 0) {
    return (
      <Card className="bg-gray-100 shadow-none">
        <CardHeader>
          <CardTitle className="px-8 text-center text-zinc-500">
            When this hypercert is listed on the marketplace, you will be able
            to buy it here.
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const { unitAmount, maxUnitsToBuy } = parseAdditionalParameters(
    validOrders[0].additionalParameters as Address
  );
  const currency = getCurrencyByAddress(
    validOrders[0].chainId,
    validOrders[0].currency
  );

  return (
    <Card className="max-w-[500px] shadow-none">
      <CardHeader>
        <CardTitle className="text-zinc-500">
          Sold by: {truncateEthereumAddress(validOrders[0].signer as Address)}
        </CardTitle>
        <CardDescription>
          To support this contribution, buy a fraction of the hypercert.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between gap-2">
        <div className="flex flex-col items-center justify-between">
          <p className="font-bold text-sm">Min units to buy:</p>
          <data className="text-xs">{unitAmount}</data>
        </div>
        <div className="flex flex-col items-center justify-between">
          <p className="font-bold text-sm">Max units to buy:</p>
          <data className="text-xs">{maxUnitsToBuy}</data>
        </div>
        <div className="flex flex-col items-center justify-between">
          <p className="font-bold text-sm">Price per unit</p>
          <data className="text-xs">
            {formatEther(BigInt(validOrders[0].price))} {currency?.symbol}
          </data>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-28">Buy</Button>
          </DialogTrigger>
          <BuyFractionDialog selectedOrder={validOrders[0]} />
        </Dialog>
      </CardFooter>
    </Card>
  );
}

export default BuyFraction;
