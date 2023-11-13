import { ethers } from "ethers";

function splitData(data: any) {
  const amounts = [];
  const dates = [];
  const rates = [];

  if (data !== undefined) {
    for (let i = 0; i < data.length; i++) {
      amounts.push(ethers.formatEther(data[i].amount || 0));
      dates.push(parseInt(data[i].createdAt));
      rates.push(parseInt(data[i].rate));
    }
  }

  return [amounts, dates, rates];
}

export default splitData;
