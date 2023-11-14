import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import Loader from "./icons/Loader";
import connect from "../constants/connect";
import { ethers } from "ethers";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

const WithdrawBox = () => {
  const [amount, setAmount] = useState("");
  const [isWithdrawn, setIsWithdrawn] = useState(0);
  const { address } = useAccount();
  const debouncedAmount = useDebounce<string>(amount, 500);

  const { config } = usePrepareContractWrite({
    //@ts-ignore
    address: connect?.moola?.address,
    //@ts-ignore
    abi: connect?.moola?.abi,
    functionName: "withdraw",
    args: [
      connect?.cusd?.address,
      ethers?.parseUnits(debouncedAmount || "0", 18),
      address,
    ],
  });

  const {
    write: withdraw,
    data,
    isLoading: isLoading,
  } = useContractWrite(config);

  const { isLoading: isWaitingTx } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      //@ts-ignore
      setIsWithdrawn(true);
    },
  });

  return (
    <aside className="p-0 lg:pt-0">
      <div className="">
        <div className="flex flex-col  py-4">
          <div className="mb-1">
            <label
              htmlFor=""
              className="text-base font-medium text-gray-900 flex items-center justify-between"
            >
              <span> Amount </span>
            </label>
            <div className="mt-2">
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isLoading || isWaitingTx}
                className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="cUSD"
              ></input>
            </div>
          </div>

          <div className="flex gap-x-5 mt-5">
            <button
              //@ts-ignore
              onClick={() => withdraw?.()}
              type="button"
              className={`${
                isLoading || isWaitingTx
                  ? "bg-black/10 cursor-not-allowed text-white"
                  : "bg-yellow hover:bg-yellow/90 text-black"
              } inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 `}
            >
              {isLoading ? (
                <Loader alt />
              ) : isWaitingTx ? (
                <Loader alt />
              ) : (
                "Withdraw"
              )}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default WithdrawBox;
