import { ethers } from "ethers";

function splitData(data: any) {
  const x = [];
  const y = [];

  if (data !== undefined) {
    for (let i = 0; i < data.length; i++) {
      x.push(ethers.formatEther(data[i].amount || 0));
      y.push(parseInt(data[i].duration));
    }
  }

  return [x, y];
}

export default splitData;
