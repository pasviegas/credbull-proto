import prisma from "../../db";
import type { NextApiRequest, NextApiResponse } from "next";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import deployedContracts from "~~/contracts/deployedContracts";
import { targetNetwork } from "~~/utils/chain";

const account = privateKeyToAccount(process.env.DEPLOYER_PRIVATE_KEY as any);

const client = createWalletClient({
  chain: targetNetwork,
  transport: http(),
  account,
});

type Status = {
  success: boolean;
};

function splitToNChunks(array: any[], n: number) {
  const result = [];
  for (let i = n; i > 0; i--) {
    result.push(array.splice(0, Math.ceil(array.length / i)));
  }
  return result;
}

const networkId = targetNetwork.id as keyof typeof deployedContracts;
const contract = deployedContracts[networkId].CredbullBadge;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Status>) {
  const points = await prisma.points.findMany();
  points.sort((a, b) => (b.points ?? 0) - (a.points ?? 0));

  const chunks = splitToNChunks(points, 3);

  const [address] = await client.getAddresses();

  for (const point of chunks[0]) {
    await client.writeContract({
      account: address,
      address: contract.address,
      abi: contract.abi,
      functionName: "setTier",
      args: [point.address, BigInt(1)],
    });
  }

  for (const point of chunks[1]) {
    await client.writeContract({
      account: address,
      address: contract.address,
      abi: contract.abi,
      functionName: "setTier",
      args: [point.address, BigInt(2)],
    });
  }

  for (const point of chunks[2]) {
    await client.writeContract({
      account: address,
      address: contract.address,
      abi: contract.abi,
      functionName: "setTier",
      args: [point.address, BigInt(3)],
    });
  }

  res.status(200).json({ success: true });
}
