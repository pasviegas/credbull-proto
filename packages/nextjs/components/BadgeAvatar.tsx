import { useAccount, useContractRead } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";

export const BadgeAvatar = (props: { size: number }) => {
  const { address } = useAccount();

  const { data: deployedVault } = useDeployedContractInfo("CredbullBadge");

  const { data: tier } = useContractRead({
    functionName: "tier",
    address: deployedVault?.address,
    abi: deployedVault?.abi,
    args: [address!],
    enabled: Boolean(deployedVault?.address),
    watch: true,
  });

  return (
    (tier ?? 0) > 0 && (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="rounded-full"
        src={`https://placehold.co/${props.size}?text=${tier}`}
        width={props.size}
        height={props.size}
        alt={`${tier} avatar`}
      />
    )
  );
};
