import { useAccount, useContractRead } from "wagmi";
import NewPiggy from "./NewPiggy";
import connect from "../constants/connect";
import UpdatePiggy from "./UpdatePiggy";

const LockBox = () => {
  const { address } = useAccount();

  const { data: isActive } = useContractRead({
    //@ts-ignore
    address: connect?.lockie?.address,
    //@ts-ignore
    abi: connect?.lockie?.abi,
    functionName: "isActive",
    args: [address],
    watch: true,
  });

  return (
    <aside className="p-0 lg:pt-0">
      <div className="">{isActive ? <UpdatePiggy /> : <NewPiggy />}</div>
    </aside>
  );
};

export default LockBox;
