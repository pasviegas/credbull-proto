// pages/api/campaigns/[address].ts
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;

  if (req.method === "GET") {
    try {
      const data = await prisma.points.findUnique({
        where: { address: String(address) },
      });

      if (!data) {
        await prisma.points.create({
          data: { address: String(address) },
        });
      }

      res.status(200).json({ success: true, points: data?.points });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === "PUT") {
    try {
      const { points } = req.body;

      if (typeof points !== "number") {
        return res.status(400).json({ success: false, error: "Invalid points value" });
      }

      const updatedData = await prisma.points.update({
        where: { address: String(address) },
        data: { points },
      });

      res.status(200).json({ success: true, points: updatedData.points });
    } catch (error) {
      console.error("Error updating data:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
