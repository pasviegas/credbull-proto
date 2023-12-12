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
  const [rp, setRp] = useState<number>(0);
  const { point: accumulatedPoints, set: setAccumulatedPoints, redeem: redeem } = usePointState();

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
          setRp(pointsData?.points || 0);
        } else {
          console.error("Failed to fetch points");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [address]); // Add 'address' to the dependency array to re-fetch when the address changes

  const redeemPointsOnClick = (_points: number) => {
    const points = accumulatedPoints - _points;
    // console.log(`points \n`, accumulatedPoints);
    redeem(rp);
    setRp(0);

    fetch(`/api/points/${address}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ points }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.points);
        // setpointCount(data.points);
        // setPoints(data.points);
      })
      .catch(error => console.error("Error:", error));
  };

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
        <button
          className="btn"
          style={{
            alignSelf: "flex-end",
            marginRight: 50,
            borderRadius: 20,
            marginTop: 10,
            backgroundColor: "#395284",
          }}
          onClick={() => {
            setRp(accumulatedPoints);
            (document?.getElementById("my_modal_1") as any)?.showModal();
          }}
        >
          Redeem
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Text explaining redeem</p>
            <div className="modal-action">
              <form method="dialog">
                <input
                  type="number"
                  placeholder="Points"
                  className="input input-bordered w-full max-w-xs"
                  style={{ marginBottom: 20 }}
                  onChange={e => setRp(parseInt(e.target.value))}
                  value={rp}
                />
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>

              <button
                className="btn"
                disabled={accumulatedPoints < rp}
                onClick={() => {
                  redeemPointsOnClick(rp);
                }}
              >
                redeem
              </button>
            </div>
          </div>
        </dialog>
        <h1>Welcome to Campaigns </h1>
        <CampaignTable campaigns={campaigns} address={address} />
      </div>
    </>
  );
};

export default CampaignPage;
