import { useContractRead } from "wagmi";
import connect from "../constants/connect";

const APR = () => {
  const {
    isLoading,
    data: { currentLiquidityRate },
  } = useContractRead({
    //@ts-ignore
    address: connect?.lockie?.address,
    abi: connect?.lockie?.abi,
    functionName: "getRate",
  });

  currentLiquidityRate && console.log(currentLiquidityRate);

  const SECONDS_PER_YEAR = 31536000;
  const ray = Number(BigInt(10 ** 27));
  console.log(ray);

  const _currentLiquidityRate = Number(currentLiquidityRate);
  console.log(_currentLiquidityRate);

  const depositAPR = _currentLiquidityRate / ray;
  console.log(depositAPR);

  const depositAPY =
    ((1 + depositAPR / SECONDS_PER_YEAR) ^ SECONDS_PER_YEAR) - 1;

  return <span> APY: {depositAPY}%</span>;
};
export default APR;
