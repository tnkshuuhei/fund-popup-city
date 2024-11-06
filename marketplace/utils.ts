import {
  ChainId,
  currenciesByNetwork,
  Currency,
} from "@hypercerts-org/marketplace-sdk";
import { formatUnits, getAddress } from "viem";

export const getTotalPriceFromPercentage = (
  pricePerPercent: bigint,
  percentageAmount: number
) => {
  if (percentageAmount < 0 || percentageAmount > 100) {
    throw new Error("Percentage amount must be between 0 and 100");
  }

  const precision = 10 ** 16;

  return (
    (pricePerPercent * BigInt(Math.round(percentageAmount * precision))) /
    BigInt(precision)
  );
};

export const getCurrencyByAddress = (chainId: ChainId, address: string) => {
  const currenciesForNetwork = currenciesByNetwork[chainId];
  const allCurrencies = Object.values(currenciesForNetwork) as Currency[];

  return allCurrencies.find(
    (currency) => getAddress(currency.address) === getAddress(address)
  );
};

export const formatPrice = (
  chainId: number | string | null | undefined,
  units: bigint,
  currency: string,
  includeSymbol = false
) => {
  if (!chainId) {
    return "Unknown chain";
  }

  const parsedChainId =
    typeof chainId === "number" ? chainId : parseInt(chainId, 10);

  const currencyData = getCurrencyByAddress(parsedChainId, currency);

  if (!currencyData) {
    return "Unknown currency";
  }

  const formattedUnits = formatUnits(units, currencyData.decimals);

  if (includeSymbol) {
    return `${formattedUnits} ${currencyData.symbol}`;
  }

  return formattedUnits;
};
