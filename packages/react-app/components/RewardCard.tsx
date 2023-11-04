import { ethers } from "ethers";
import useGetBalance from "../hooks/useGetBalance";
import Fire from "./icons/Fire";
import Earnings from "./icons/Earnings";

const RewardCard = () => {
  const balance = useGetBalance("givv");

  return (
    <div className=" bg-gray/5 rounded-lg p-8 w-full text-right">
      <div className="text-right">
        <p className="text-xl font-semibold flex flex-col ">
          <span>
            {
              //@ts-ignore
              ethers.formatEther(balance || 0)
            }{" "}
            cUSD
          </span>
          <small className="text-xs text-gray/40">
            ~{" "}
            {
              //@ts-ignore
              ethers.formatEther(balance || 0) * 1000
            }{" "}
            NGN
          </small>
        </p>
        <span className="flex items-center justify-end mt-2">
          <Earnings /> Earnings
        </span>
      </div>
    </div>
  );
};
export default RewardCard;
