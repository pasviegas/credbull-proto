import { useAccount, useContractRead } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";

export const BadgeAvatar = (props: { size: number }) => {
  const { address } = useAccount();

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
    await fetch("/api/refresh-tier");
  };

  return (
    parseInt((tier ?? "0").toString()) > 0 && (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="rounded-full cursor-pointer"
        src={`https://placehold.co/${props.size}?text=${tier}`}
        width={props.size}
        height={props.size}
        alt={`${tier} avatar`}
        onClick={onClick}
      />
    )
  );
};
