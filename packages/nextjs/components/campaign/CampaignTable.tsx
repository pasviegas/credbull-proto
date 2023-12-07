// CampaignTable.js
import React from "react";
import { Campaign } from "~~/interfaces/campaign";
import styles from "~~/styles/CampaignTable.module.css";

interface CampaignTableProps {
  campaigns: Campaign[];
}

const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th className={styles.th}>ID</th>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Description</th>
            <th className={styles.th}>Active</th>
            <th className={styles.th}>Points</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map(campaign => (
            <tr key={campaign.id}>
              <td className={styles.td}>{campaign.id}</td>
              <td className={styles.td}>{campaign.name}</td>
              <td className={styles.td}>{campaign.description}</td>
              <td className={styles.td}>{campaign.is_active ? "Yes" : "No"}</td>
              <td className={styles.td}>{campaign.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignTable;
