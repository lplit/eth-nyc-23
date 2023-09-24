import { useState } from "react";
import { CopyIcon } from "./assets/CopyIcon";
import { DiamondIcon } from "./assets/DiamondIcon";
import { HareIcon } from "./assets/HareIcon";
import { ArrowSmallRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const inputClasses = "input my-1 font-bai-jamjuree w-full px-5 border border-primary placeholder-black uppercase";

export const ContractInteraction = () => {
  const [visible, setVisible] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [durationInDays, setDurationInDays] = useState<bigint>(0n);
  const [amountToRaise, setAmountToRaise] = useState<bigint>(0n);
  const [contributeProjectId, setContributeProjectId] = useState(0);
  const [contributeAmount, setContributeAmount] = useState(0);

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "Crowdfunding",
    functionName: "startProject",
    args: [newTitle, newDesc, durationInDays, amountToRaise],
    // value: "0.01",
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: writeContributeAsync, isLoading: isLoadingContribute } = useScaffoldContractWrite({
    contractName: "Crowdfunding",
    functionName: "contribute",
    value: `${contributeAmount}`,
    args: [BigInt(contributeProjectId)],
    onBlockConfirmation(txnReceipt) {
      console.log("📦 Contribute Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <div className="flex bg-base-300 relative pb-10">
      <DiamondIcon className="absolute top-24" />
      <CopyIcon className="absolute bottom-0 left-36" />
      <HareIcon className="absolute right-0 bottom-24" />
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">
        <div className={`mt-10 flex gap-2 ${visible ? "" : "invisible"} max-w-2xl`}>
          <div className="flex gap-5 bg-base-200 bg-opacity-80 z-0 p-7 rounded-2xl shadow-lg">
            <span className="text-3xl">⌐[T]-[T]</span>
            <div>
              <div>
                Create a <strong>crowdfunding campaign</strong> and fund your project.
              </div>
              <div>
                Gather funds and start your project.
              </div>
            </div>
          </div>
          <button
            className="btn btn-circle btn-ghost h-6 w-6 bg-base-200 bg-opacity-80 z-0 min-h-0 drop-shadow-md"
            onClick={() => setVisible(false)}
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary">
          <span className="text-4xl sm:text-6xl text-black">Start a crowdfund_</span>

          <div className="mt-8 flex-row sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
            <input
              type="text"
              placeholder="Title"
              className={inputClasses}
              onChange={e => setNewTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              className={inputClasses}
              onChange={e => setNewDesc(e.target.value)}
            />
            <input
              type="number"
              placeholder="Duration in days"
              className={inputClasses}
              onChange={e => setDurationInDays(BigInt(e.target.value))}
            />
            <input
              type="number"
              placeholder="Amount to raise in ETH"
              className={inputClasses}
              onChange={e => setAmountToRaise(BigInt(e.target.value))}
            />
            <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
              <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className="btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest"
                  onClick={() => writeAsync()}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      Send <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary">
          <span className="text-4xl sm:text-6xl text-black">Add to a crowdfund_</span>

          <div className="mt-8 flex-row sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
            <input
              type="number"
              placeholder="Project ID"
              className={inputClasses}
              onChange={e => setContributeProjectId(parseInt(e.target.value))}
            />
            <input
              type="number"
              placeholder="Amount"
              className={inputClasses}
              onChange={e => setContributeAmount(parseInt(e.target.value))}
            />
            <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
              <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className="btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest"
                  onClick={() => writeContributeAsync()}
                  disabled={isLoadingContribute}
                >
                  {isLoadingContribute ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      Send <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
