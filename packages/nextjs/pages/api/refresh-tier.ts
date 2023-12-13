import prisma from "../../db";
import { Contract, Wallet, getDefaultProvider } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
import deployedContracts from "~~/contracts/deployedContracts";
import { targetNetwork } from "~~/utils/chain";

const privateKey = process.env.DEPLOYER_PRIVATE_KEY ?? "";
const provider = getDefaultProvider("goerli");
const signer = new Wallet(privateKey, provider);

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

  const badge = new Contract(contract.address, contract.abi, signer);

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
