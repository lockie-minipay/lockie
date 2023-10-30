import { useState } from "react";
import HandleSavings from "../components/HandleSavings";

const SaveBox = () => {
  const [selected, setSelected] = useState("deposit");

  return (
    <aside className="p-0 lg:w-[30%] lg:p-4 lg:pt-0">
      <div className="">
        <HandleSavings />
      </div>
    </aside>
  );
};

export default SaveBox;
