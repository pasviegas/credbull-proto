import { useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";

export const BadgeAvatar = (props: { size: number }) => {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);

  const { data: deployedVault } = useDeployedContractInfo("CredbullBadge");

  const { data: tier } = useContractRead({
    functionName: "tier",
    address: deployedVault?.address,
    abi: deployedVault?.abi,
    // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
    args: [address!],
    enabled: Boolean(deployedVault?.address),
    watch: true,
  });

  const onClick = async () => {
    setLoading(true);
    await fetch("/api/refresh-tier");
    setLoading(false);
  };

  return (
    parseInt((tier ?? "0").toString()) > 0 && (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className={`rounded-full ${loading ? "cursor-progress" : "cursor-pointer"}`}
        src={`https://placehold.co/${props.size}?text=${tier}`}
        width={props.size}
        height={props.size}
        alt={`${tier} avatar`}
        onClick={onClick}
      />
    )
  );
};
