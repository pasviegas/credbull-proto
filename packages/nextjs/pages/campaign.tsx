import { useEffect, useState } from "react";
import { NextPage } from "next";
import CampaignTable from "~~/components/campaign/CampaignTable";
import { Campaign } from "~~/interfaces/campaign";
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

  const fetchData = async () => {
    try {
      const response = await fetch("/api/campaign");

      if (response.ok) {
        const data: CampaignResponse = await response.json();
        setCampaigns(data.campaigns);
        console.log("response", campaigns);
      } else {
        console.error("Failed to fetch campaigns");
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Welcome to Campaign</h1>
      <div className={styles.container}>
        <CampaignTable campaigns={campaigns} />
      </div>
    </>
  );
};

export default CampaignPage;
