import { ethers } from "ethers";
import Earnings from "./icons/Earnings";
import { useAccount, useContractRead } from "wagmi";
import connect from "../constants/connect";

const RewardCard = () => {
  const { address } = useAccount();

  const { data: mcusdBal } = useContractRead({
    //@ts-ignore
    address: connect?.mToken?.address,
    //@ts-ignore
    abi: connect?.mToken?.abi,
    functionName: "balanceOf",
    watch: true,
    args: [address],
  });

  return (
    <div className=" bg-gray/5 rounded-lg p-8 w-full text-right">
      <div className="text-right">
        <p className="text-xl font-semibold flex flex-col ">
          <span>
            {
              //@ts-ignore
              parseFloat(
                //@ts-ignore
                ethers?.formatUnits(mcusdBal || "0", 18)
              ).toFixed(2)
            }{" "}
            USDC
          </span>
          <span className="text-gray text-xs">
            {
              //@ts-ignore
              parseFloat(
                //@ts-ignore
                ethers?.formatUnits(mcusdBal || "0", 6)
              ).toFixed(2)
            }{" "}
            USDC
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
        <span className="flex items-center justify-end mt-2">
          <Earnings /> Earnings
        </span>
      </div>
    </div>
  );
};
export default RewardCard;
