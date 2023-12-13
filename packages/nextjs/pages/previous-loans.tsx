import type { NextPage } from "next";
import { useAccount, useContractRead } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { Spinner } from "~~/components/assets/Spinner";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";

const MaturedPool = ({ vault }: { vault: string }) => {
  const { address } = useAccount();

  const { data: deployedVault } = useDeployedContractInfo("CredbullVault");

  const { data } = useContractRead({
    functionName: "loanReturns",
    address: deployedVault?.address,
    abi: deployedVault?.abi,
    args: [address!],
    enabled: Boolean(deployedVault?.address),
  });

  const returns = data as any;

  return (
    <div className="bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 flex flex-col mt-10 relative w-[40rem] m-auto">
      <div className="h-[5rem] w-[13rem] bg-base-300 absolute self-start rounded-[22px] -top-[38px] -left-[1px] -z-10 py-[0.65rem] shadow-lg shadow-base-300">
        <div className="flex items-center justify-center space-x-2">
          <p className="my-0 text-sm">Matured Pool: {vault.slice(14, 20)}</p>
        </div>
      </div>
      <div className="p-7 divide-y divide-transparent h-30">
        <div className="flex gap-2">
          <div className={`flex m-auto`}>Principal: {(returns?.principal ?? 0).toString()}</div>
          <div className={`flex m-auto`}>Total Returns: {(returns?.total ?? 0).toString()}</div>
        </div>
      </div>
    </div>
  );
};

const PreviousLoans: NextPage = () => {
  const { data: deployedMatured, isLoading: isLoadingMatured } = useDeployedContractInfo("CredbullMaturedVaults");

  const { data, isLoading: isLoadingActiveVault } = useContractRead({
    functionName: "getMaturedVaults",
    address: deployedMatured?.address,
    abi: deployedMatured?.abi,
    enabled: Boolean(deployedMatured?.address),
  });

  const vaultAddress = data as string;

  if (isLoadingMatured || !deployedMatured || isLoadingActiveVault || !vaultAddress) {
    return (
      <div className="mt-14">
        <Spinner width="50px" height="50px" />
      </div>
    );
  }

  return (
    <>
      <MetaHeader
        title="Debug Contracts | Scaffold-ETH 2"
        description="Debug your deployed 🏗 Scaffold-ETH 2 contracts in an easy way"
      />
      <div className="flex flex-col gap-y-6 lg:gap-y-8 py-8 lg:py-12 justify-center items-center">
        <div className="z-10">
          {vaultAddress.split(",").map((vault: string, i) => {
            return <MaturedPool vault={vault} key={i} />;
          })}
        </div>
      </div>
    </>
  );
};

export default PreviousLoans;
