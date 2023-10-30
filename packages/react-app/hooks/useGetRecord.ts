import { useAccount, useContractRead, useNetwork } from "wagmi";
import connect from "../constants/connect";

const useGetRecord = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();

  const { data: record } = useContractRead({
    //@ts-ignore
    address: connect?.[chain?.id]?.address,
    //@ts-ignore
    abi: connect?.[chain?.id]?.abi,
    functionName: "getRecord",
    args: [address],
    watch: true,
  });

  return record;
};

export default useGetRecord;
