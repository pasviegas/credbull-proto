import prisma from "../../db";
import { Contract, Wallet, getDefaultProvider } from "ethers";
import { Inngest } from "inngest";
import { serve } from "inngest/next";
import deployedContracts from "~~/contracts/deployedContracts";

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

export const inngest = new Inngest({ id: "credbull-proto" });

const refreshTierFn = inngest.createFunction(
  { id: "refresh-tier-fn", retries: 10 },
  { event: "ethers/refresh.tier" },
  async ({ event, step }) => {
    const privateKey = process.env.DEPLOYER_PRIVATE_KEY ?? "";
    const provider = getDefaultProvider("goerli");
    const signer = new Wallet(privateKey, provider);
    const badge = new Contract(contract.address, contract.abi, signer) as any;

    const chunks = await step.run("get-chunks", async () => {
      const points = await prisma.points.findMany();
      points.sort((a, b) => (b.points ?? 0) - (a.points ?? 0));

      return splitToNChunks(points, 3);
    });

    await step.run("update-tier-1", async () => {
      for (const point of chunks[0]) {
        await badge.setTier(point.address, BigInt(1));
      }
    });

    await step.run("update-tier-2", async () => {
      for (const point of chunks[1]) {
        await badge.setTier(point.address, BigInt(2));
      }
    });

    await step.run("update-tier-3", async () => {
      for (const point of chunks[2]) {
        await badge.setTier(point.address, BigInt(3));
      }
    });

    return { event, body: "Hello, World!" };
  },
);

// Create an API that serves zero functions
export default serve({
  client: inngest,
  functions: [refreshTierFn],
});
