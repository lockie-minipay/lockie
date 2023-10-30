import {
  useNetwork,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import useGetBalance from "../hooks/useGetBalance";
import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import Loader from "./icons/Loader";
import connect from "../constants/connect";
import { ethers } from "ethers";

const NewPiggy = () => {
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [isApproved, setIsApproved] = useState(false);

  const { chain } = useNetwork();

  //to check amount input
  const balance = useGetBalance("usdc");

  const debouncedAmount = useDebounce<string>(amount, 500);
  const debouncedDuration = useDebounce<string>(duration, 500);

  const { config } = usePrepareContractWrite({
    //@ts-ignore
    address: connect?.cusd?.address,
    //@ts-ignore
    abi: connect?.cusd?.abi,
    functionName: "approve",
    args: [
      //@ts-ignore
      connect?.lockie?.address,
      ethers?.parseEther(debouncedAmount || "0"),
    ],
  });

  const {
    write: approveSpend,
    data,
    isLoading: isApproving,
  } = useContractWrite(config);

  const { isLoading: isWaitingTx } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(tx) {
      //enable save button
      setIsApproved(true);
      refetch?.();
    },
  });

  //-- Save -- //
  const { config: saveConfig, refetch } = usePrepareContractWrite({
    //@ts-ignore
    address: connect?.lockie?.address,
    //@ts-ignore
    abi: connect?.lockie?.abi,
    functionName: "createPiggy",
    args: [ethers.parseEther(debouncedAmount || "0"), debouncedDuration],
  });

  const {
    write: save,
    data: saveData,
    isLoading: isSaving,
  } = useContractWrite(saveConfig);

  const { isLoading: isWaitingSaveTx } = useWaitForTransaction({
    hash: saveData?.hash,
    onSuccess(tx) {
      //enable save button
      setAmount("");
      setDuration("");
      setIsApproved(false);
      //reloadIsActive();
      console.log("Successful!!!");
    },
  });

  return (
    <div className="flex flex-col gap-y-3 py-4">
      <div>
        <label htmlFor="" className="text-base font-medium text-gray-900">
          Amount
        </label>
        <div className="mt-2">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isApproved || isApproving || isWaitingTx}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="cUSD"
          ></input>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="" className="text-base font-medium text-gray-900">
            Duration
          </label>
        </div>
        <div className="mt-2">
          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            disabled={isApproved || isApproving || isWaitingTx}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Days"
          ></input>
        </div>
      </div>

      <div className="flex gap-x-5">
        <button
          onClick={() => approveSpend?.()}
          disabled={isApproved}
          type="button"
          className={`${
            !isApproved
              ? "bg-yellow hover:bg-yellow/90 text-black"
              : "bg-black/10 cursor-not-allowed text-white"
          } inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 `}
        >
          {isApproving ? (
            <Loader alt />
          ) : isWaitingTx ? (
            <Loader alt />
          ) : (
            "Approve"
          )}
        </button>

        <button
          onClick={() => save?.()}
          type="button"
          className={`${
            isApproved
              ? "bg-yellow hover:bg-yellow/90 text-black"
              : "bg-black/10 cursor-not-allowed text-white"
          } inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 `}
        >
          {isSaving ? (
            <Loader alt />
          ) : isWaitingSaveTx ? (
            <Loader alt />
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  );
};
export default NewPiggy;
