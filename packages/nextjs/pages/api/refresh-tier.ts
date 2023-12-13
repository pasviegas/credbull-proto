import type { NextApiRequest, NextApiResponse } from "next";
import { inngest } from "~~/pages/api/inngest";

type Status = {
  success: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Status>) {
  await inngest.send({ name: "ethers/refresh.tier", data: {} });

  res.status(200).json({ success: true });
}
