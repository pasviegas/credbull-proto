// CampaignTable.js
import React, { useState } from "react";
import { Campaign } from "~~/interfaces/campaign";
import styles from "~~/styles/CampaignTable.module.css";

interface CampaignTableProps {
  campaigns: Campaign[];
}

const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns }) => {
  const [pointCount, setpointCount] = useState<number>(0);

  const handleUpdateClickedCount = (points: number) => {
    setpointCount(pointCount + points);
  };

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
            <th className={styles.th}>Action</th>
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
              <td className={styles.td}>
                <button
                  disabled={!campaign.is_active}
                  className={`${
                    !campaign.is_active ? "btn-disabled " : ""
                  } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
                  onClick={() => handleUpdateClickedCount(campaign.points)}
                >
                  Engage
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p>Overall Total Points: {pointCount}</p>
      </div>
    </div>
  );
};

export default CampaignTable;
