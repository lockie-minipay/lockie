import axios from "axios";
import Lock from "./icons/Lock";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { useEffect } from "react";

const CurrentDeposit = () => {
  const ethBal = "100000000000000000";
  const { address } = useAccount();

  const getBal = async () => {
    const { data } = await axios.post("/api/get-balance", {
      address,
    });

    console.log(data);
  };

  useEffect(() => {
    if (address !== undefined) {
      getBal()
        .then((d) => console.log(d))
        .catch((e) => console.log(e));
    }
  }, [address]);

  return (
    <div className="text-left">
      <p className="text-xl font-semibold flex flex-col ">
        <span>
          {
            //@ts-ignore
            ethers.formatEther(ethBal || 0)
          }{" "}
          cUSD
        </span>
        <small className="text-xs text-gray/40">
          ~{" "}
          {
            //@ts-ignore
            parseFloat(
              //@ts-ignore
              ethers?.formatUnits(ethBal || "0", 18)
            ).toFixed(2) * 1000
          }{" "}
          NGN
        </small>
      </p>
      <span className="flex items-center justify-start mt-2">
        {" "}
        <Lock /> Savings
      </span>
    </div>
  );
};
export default CurrentDeposit;
