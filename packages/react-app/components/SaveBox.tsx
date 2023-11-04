import { useState } from "react";
import NewPiggy from "./NewPiggy";

const SaveBox = () => {
  return (
    <aside className="p-0 lg:w-[30%] lg:p-4 lg:pt-0">
      <div className="">
        <NewPiggy />
      </div>
    </aside>
  );
};

export default SaveBox;
