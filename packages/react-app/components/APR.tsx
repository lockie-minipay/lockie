import { useAccount, useContractRead } from "wagmi";
import connect from "../constants/connect";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ethers } from "ethers";

const APR = ({ setRate }: { setRate: Dispatch<SetStateAction<number>> }) => {
  const { address } = useAccount();

  const { isLoading, data } = useContractRead({
    //@ts-ignore
    address: connect?.lockie?.address,
    abi: connect?.lockie?.abi,
    functionName: "getRate",
  });

  const { data: d } = useContractRead({
    //@ts-ignore
    address: connect?.moola?.address,
    abi: connect?.moola?.abi,
    functionName: "getUserAccountData",
    args: [address],
  });

  d && console.log(ethers.formatEther(d[0]));

  const SECONDS_PER_YEAR = 31536000;
  const ray = Number(BigInt(10 ** 27));

  //@ts-ignore
  const _currentLiquidityRate = Number(data?.currentLiquidityRate) || 0;

  const depositAPR = _currentLiquidityRate / ray;

  const depositAPY =
    (1 + depositAPR / SECONDS_PER_YEAR) ** SECONDS_PER_YEAR - 1;

  useEffect(() => {
    //@ts-ignore
    setRate(parseFloat(depositAPY * 100).toFixed(2));
  }, [data]);
  return (
    <span>
      APY:{" "}
      {parseFloat(
        //@ts-ignore
        depositAPY * 100
      ).toFixed(2)}
      %
    </span>
  );
};
export default APR;
