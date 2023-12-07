import type { NextApiRequest, NextApiResponse } from "next";
import { Campaign } from "~~/interfaces/campaign";

const campaigns: Campaign[] = [
  {
    id: 1,
    name: "Click to earn more",
    description: "Click on the button to earn 100 points",
    is_active: true,
    points: 100,
  },
  {
    id: 2,
    name: "Click to earn few",
    description: "Click on the button to earn 10 points",
    is_active: true,
    points: 10,
  },
  {
    id: 3,
    name: "Click to earn",
    description: "This campaign is over",
    is_active: false,
    points: 100,
  },
];

type campaign_response = {
  success: boolean;
  campaigns: Campaign[];
};

export default function handler(req: NextApiRequest, res: NextApiResponse<campaign_response>) {
  res.status(200).json({ success: true, campaigns: campaigns });
}
