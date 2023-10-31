import { useAccount, useContractRead, useNetwork } from "wagmi";
import connect from "../constants/connect";

const useGetRecord = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();

  const { data: record } = useContractRead({
    //@ts-ignore
    address: connect?.lockie?.address,
    //@ts-ignore
    abi: connect?.lockie?.abi,
    functionName: "getRecord",
    args: [address],
    watch: true,
  });

  return record;
};

export default useGetRecord;
