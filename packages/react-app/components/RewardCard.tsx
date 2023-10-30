import { ethers } from "ethers";
import useGetBalance from "../hooks/useGetBalance";
import Fire from "./icons/Fire";

const RewardCard = () => {
  const balance = useGetBalance("givv");

  return (
    <div className=" bg-gray/5 rounded-lg p-8 w-full text-right">
      <p className="text-xl font-semibold">
        {
          //@ts-ignore
          Math.floor(ethers?.formatEther(balance || "0") * 100) / 100
        }{" "}
        GIVV
      </p>
      <span className="flex justify-end mt-2">
        <Fire />
        Earned
      </span>
    </div>
  );
};
export default RewardCard;
