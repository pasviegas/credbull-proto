import * as chains from "viem/chains";

export const targetNetwork = chains[process.env.NEXT_PUBLIC_TARGET_NETWORK as keyof typeof chains] || chains.foundry;
