import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useAccount } from "wagmi";
import CampaignTable from "~~/components/campaign/CampaignTable";
import { Campaign } from "~~/interfaces/campaign";
import { usePointState } from "~~/services/store/points";
import styles from "~~/styles/CampaignTable.module.css";

/**
 * Campaigns page
 */

interface CampaignResponse {
  success: boolean;
  campaigns: Campaign[];
}

const CampaignPage: NextPage = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const { address } = useAccount();
  const [, setPoints] = useState<number>(0);
  const { point: accumulatedPoints, set: setAccumulatedPoints } = usePointState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!address) {
          return; // Do nothing if address is not available
        }

        // Fetch campaigns
        const campaignResponse = await fetch("/api/campaign");
        if (campaignResponse.ok) {
          const campaignData: CampaignResponse = await campaignResponse.json();
          setCampaigns(campaignData.campaigns);
        } else {
          console.error("Failed to fetch campaigns");
        }

        // Fetch points for the given address
        const pointResponse = await fetch(`api/points/${address}`);
        if (pointResponse.ok) {
          const pointsData = await pointResponse.json();
          setPoints(pointsData?.points || 0);
          setAccumulatedPoints(pointsData?.points || 0);
        } else {
          console.error("Failed to fetch points");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [address]); // Add 'address' to the dependency array to re-fetch when the address changes

  return (
    <>
      <div className={styles.container}>
        <div
          className="btn "
          style={{
            alignSelf: "flex-end",
            marginRight: 50,
            borderRadius: 20,
            marginTop: 10,
            backgroundColor: "#395284",
            // padding: 5,
            // boxShadow: "",
          }}
        >
          <p>Overall Total Points: {accumulatedPoints}</p>
        </div>
        <h1>Welcome to Campaigns </h1>
        <CampaignTable campaigns={campaigns} address={address} />
      </div>
    </>
  );
};

export default CampaignPage;
