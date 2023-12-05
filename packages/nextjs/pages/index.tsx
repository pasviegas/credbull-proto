import { useState } from "react";
import type { NextPage } from "next";
import { useAccount, useContractRead } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { Spinner } from "~~/components/assets/Spinner";
import { useDeployedContractInfo, useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Lending: NextPage = () => {
  const [amount, setAmount] = useState(0);

  const { address } = useAccount();

  const { data: deployedStable, isLoading: isLoadingStable } = useDeployedContractInfo("MockStableCoin");
  const { data: deployedDelegate, isLoading: isLoadingDelegate } =
    useDeployedContractInfo("CredbullActiveVaultDelegate");

  const { data: vaultAddress, isLoading: isLoadingActiveVault } = useContractRead({
    functionName: "activeVault",
    address: deployedDelegate?.address,
    abi: deployedDelegate?.abi,
    enabled: Boolean(deployedDelegate?.address),
  });

  const { writeAsync: writeApprove } = useScaffoldContractWrite({
    contractName: "MockStableCoin",
    functionName: "approve",
    args: [vaultAddress as string, BigInt(amount)],
    address: deployedStable?.address,
  });

  const { writeAsync: writeDeposit } = useScaffoldContractWrite({
    contractName: "CredbullVault",
    functionName: "deposit",
    args: [BigInt(amount), address],
    address: vaultAddress as string,
  });

  const { data } = useScaffoldContractRead({
    contractName: "CredbullVault",
    functionName: "balanceOf",
    args: [address],
    address: vaultAddress as string,
  });

  const onClick = async () => {
    await writeApprove();
    await writeDeposit();
  };

  if (
    isLoadingStable ||
    !deployedStable ||
    !address ||
    isLoadingDelegate ||
    !deployedDelegate ||
    isLoadingActiveVault ||
    !vaultAddress
  ) {
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
          <div className="bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 flex flex-col mt-10 relative w-[40rem] m-auto">
            <div className="h-[5rem] w-[13rem] bg-base-300 absolute self-start rounded-[22px] -top-[38px] -left-[1px] -z-10 py-[0.65rem] shadow-lg shadow-base-300">
              <div className="flex items-center justify-center space-x-2">
                <p className="my-0 text-sm">Active Lending Pool</p>
              </div>
            </div>
            <div className="p-5 divide-y divide-base-300">
              <div className={`flex border-2 border-base-300 bg-base-200 rounded-full text-accent`}>
                <input
                  className="input input-ghost focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
                  onChange={e => setAmount(parseInt(e.target.value))}
                  type="number"
                />
              </div>
              <div className="flex gap-2  pt-3">
                <div>LPT balance: {data?.toString()}</div>
                <div className={`flex m-auto`}>
                  <button className="btn btn-secondary btn-sm" onClick={onClick}>
                    Deposit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lending;
