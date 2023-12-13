import { Contract, InfuraProvider, Wallet } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
import deployedContracts from "~~/contracts/deployedContracts";
import prisma from "~~/db";

export const config = {
  maxDuration: 300,
};

const contract = deployedContracts[5].CredbullBadge;

function splitToNChunks(array: any[], n: number) {
  const result = [];
  for (let i = n; i > 0; i--) {
    result.push(array.splice(0, Math.ceil(array.length / i)));
  }
  return result;
}

type Status = {
  success: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Status>) {
  // await inngest.send({ name: "ethers/refresh.tier", data: {} });

  const points = await prisma.points.findMany();
  points.sort((a, b) => (b.points ?? 0) - (a.points ?? 0));

  const privateKey = process.env.DEPLOYER_PRIVATE_KEY ?? "";
  const provider = new InfuraProvider("goerli", process.env.INFURA_API_KEY);
  const signer = new Wallet(privateKey, provider);
  const badge = new Contract(contract.address, contract.abi, signer) as any;

  const chunks = splitToNChunks(points, 3);

  for (const point of chunks[0]) {
    await badge.setTier(point.address, BigInt(1));
  }

  for (const point of chunks[1]) {
    await badge.setTier(point.address, BigInt(2));
  }

  for (const point of chunks[2]) {
    await badge.setTier(point.address, BigInt(3));
  }

  res.status(200).json({ success: true });
}
