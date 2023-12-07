import { ethers } from "ethers";
import useGetBalance from "../hooks/useGetBalance";
import Balance from "./icons/Balance";
import useGetRecord from "../hooks/useGetRecord";
import Lock from "./icons/Lock";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useState } from "react";
import { useCountdown } from "../hooks/useCountdown";
import connect from "../constants/connect";
import Loader from "./icons/Loader";

const LockCard = () => {
  const balance = useGetBalance();
  const record = useGetRecord();

  const [isOpen, setIsOpen] = useState(false);

  const { days, hours, minutes, seconds, isCountdownCompleted } = useCountdown(
    //@ts-ignore
    parseInt(record?.expiresAt)
  );

  const { config, refetch } = usePrepareContractWrite({
    //@ts-ignore
    address: connect?.lockie?.address,
    //@ts-ignore
    abi: connect?.lockie?.abi,
    functionName: "breakPiggy",
    enabled: false,
  });

  const {
    write: breakPiggy,
    data,
    isLoading: isBreaking,
  } = useContractWrite(config);

  const { isLoading: isWaitingTx } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(tx) {
      //disable modal
      setIsOpen(false);
    },
  });

  const handleBreak = async () => {
    await refetch();
    breakPiggy?.();
  };

  return (
    <div className="relative mt-3 bg-gray/5 rounded-lg py-8 px-3 lg:px-8 w-full overflow-hidden shadow-md">
      {
        //@ts-ignore
        record?.status > 0 && (
          <div
            className={`${
              isOpen ? "flex" : "hidden"
            } absolute text-center top-0 right-0 w-full h-full bg-base-100 text-white p-4  flex-col justify-between`}
          >
            <h3 className="font-semibold text-xl">
              {isCountdownCompleted
                ? "Great Job Saving! 🌦️"
                : "You can do better! 🎳"}
            </h3>
            <p className="">
              {isCountdownCompleted
                ? "You are among top 5% of users who take their savings seriously! 👏"
                : "You will be charged 1% penalty if you break before duration"}
            </p>

            <div className="flex gap-x-2 items-center justify-between mt-2">
              <button
                onClick={() => handleBreak()}
                className="bg-yellow text-red-400 px-3.5 py-2.5 rounded-sm w-full inline-flex justify-center items-center"
              >
                {isBreaking ? (
                  <Loader alt />
                ) : isWaitingTx ? (
                  <Loader alt />
                ) : (
                  "proceed"
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="border-white  text-white px-3.5 py-2.5rounded-sm w-full inline-flex justify-center items-center"
              >
                cancel
              </button>
            </div>
          </div>
        )
      }

      <div className="flex flex-col gap-y-5">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <p className="text-xl font-semibold flex flex-col ">
              <span>
                {
                  //@ts-ignore
                  parseFloat(
                    //@ts-ignore
                    ethers?.formatUnits(record?.balance || "0", 18)
                  ).toFixed(2)
                }{" "}
                cUSD
              </span>
              <small className="text-xs text-gray/40">
                ~{" "}
                {
                  //@ts-ignore
                  parseFloat(
                    //@ts-ignore
                    ethers?.formatUnits(record?.balance || "0", 18)
                  ).toFixed(2) * 1000
                }{" "}
                NGN
              </small>
            </p>
            <span className="flex items-center justify-start mt-2">
              <Lock /> Locked
            </span>
          </div>

          <div className="text-right">
            <p className="text-xl font-semibold flex flex-col ">
              <span>
                {
                  //@ts-ignore
                  parseFloat(
                    //@ts-ignore
                    ethers?.formatUnits(balance || "0", 18)
                  ).toFixed(2)
                }{" "}
                cUSD
              </span>
              <small className="text-xs text-gray/40">
                ~{" "}
                {
                  //@ts-ignore
                  parseFloat(
                    //@ts-ignore
                    ethers?.formatUnits(balance || "0", 18)
                  ).toFixed(2) * 1000
                }{" "}
                NGN
              </small>
            </p>
            <span className="flex items-center justify-end mt-2">
              <Balance /> Balance
            </span>
          </div>
        </div>

        {
          //@ts-ignore
          record?.status > 0 && (
            <>
              <div className="line w-[60%] mx-auto h-[1px] lg:hidden" />

              <div className="font-mono text-xl text-center">
                {isCountdownCompleted ? (
                  <p>Savings goal achieved!</p>
                ) : (
                  <>
                    <p className="text-xs">Locked until</p>
                    <p>
                      {days}d:{hours}h:{minutes}m:{seconds}s
                    </p>
                  </>
                )}
              </div>

              <button
                onClick={() => setIsOpen(true)}
                className={`${
                  isCountdownCompleted
                    ? "bg-green-700 hover:bg-green-700/90 active:bg-green-700"
                    : "text-red-400 hover:bg-red-500"
                }  text-red`}
              >
                Break Piggy
              </button>
            </>
          )
        }

        {/* <div className="text-center lg:hidden">
          <span className="flex items-center justify-center mt-2">
            <Earnings /> Earnings
          </span>
          <p className="text-xl font-semibold flex flex-col ">
            <span className="text-gray/30 text-xs">
              {
                //@ts-ignore
                parseFloat(
                  //@ts-ignore
                  ethers?.formatUnits(mcusdBal || "0", 6)
                ).toFixed(2)
              }{" "}
              cUSD
            </span>

            <span>
              {
                //@ts-ignore
                parseFloat(
                  //@ts-ignore
                  ethers?.formatUnits(mcusdBal || "0", 18)
                ).toFixed(2)
              }{" "}
              cUSD
            </span>
            <small className="text-xs text-gray/40">
              ~{" "}
              {
                //@ts-ignore
                parseFloat(
                  //@ts-ignore
                  ethers?.formatUnits(mcusdBal || "0", 18)
                ).toFixed(2) * 1000
              }{" "}
              NGN
            </small>
          </p>
        </div> */}
      </div>
    </div>
  );
};
export default LockCard;
