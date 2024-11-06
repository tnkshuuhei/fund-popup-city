"use client";

import { CopyButton } from "@/components/copy-button";
import { truncateEthereumAddress } from "@/lib/utils";
import {
  http,
  createConfig,
  getEnsAddress,
  Config,
  getEnsName,
  getEnsAvatar,
} from "@wagmi/core";
import { mainnet } from "@wagmi/core/chains";
import { normalize } from "viem/ens";

class ENSResolver {
  private config: Config;

  constructor() {
    this.config = createConfig({
      chains: [mainnet],
      transports: {
        [mainnet.id]: http(),
      },
    });
  }

  async resolveENSAvatar(name: string) {
    const ensAvatar = await getEnsAvatar(this.config, {
      assetGatewayUrls: {
        ipfs: "https://ipfs.io/",
      },
      name: normalize(name),
    });
    return ensAvatar;
  }

  async resolveName(address: string): Promise<string | null> {
    if (!address) {
      return null;
    }

    try {
      return await getEnsAddress(this.config, {
        name: normalize(address),
      });
    } catch (error) {
      console.error(`Error resolving address for name ${address}:`, error);
      return null;
    }
  }

  async resolveAddress(address: string): Promise<string | null> {
    if (!address) {
      return null;
    }

    try {
      return await getEnsName(this.config, {
        address: address as `0x${string}`,
      });
    } catch (error) {
      console.error(`Error resolving ENS name for address ${address}:`, error);
      return null;
    }
  }
}

export default async function EthAddress({
  address,
  showEnsName,
}: {
  address: string;
  showEnsName: boolean;
}) {
  const resolver = new ENSResolver();

  const ensName = await resolver.resolveAddress(address);

  if (!address) {
    return <div>Unknown</div>;
  }

  const copyAddress = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    void navigator.clipboard.writeText(address);
  };

  return (
    <div className="flex w-max cursor-pointer content-center items-center gap-2 rounded-md bg-slate-100 px-1 py-0.5 text-sm">
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div onClick={copyAddress}>
        {showEnsName && ensName
          ? ensName
          : truncateEthereumAddress(address as `0x${string}`)}
      </div>
      <CopyButton
        textToCopy={address}
        className="h-4 w-4 bg-transparent focus:scale-90 focus:opacity-70"
      />
    </div>
  );
}
