import { BrowserProvider, Contract, parseEther } from "ethers";

const CUSD_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a";

export const approveCUSD = async (
  spender: string,
  amount: string,
  user: string
) => {
  if (window.ethereum) {
    // Get connected accounts, if not connected request connnection.
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner(user);

    // The current selected account out of the connected accounts.

    let abi = ["function approve(address spender, uint256 amount)"];
    const CUSDContract = new Contract(CUSD_ADDRESS, abi, signer);
    let txn = await CUSDContract.approve(spender, parseEther(amount));
    let receipt = await txn.wait();
    console.log(receipt);
    return receipt;
  }
};

export const createPigy = async (
  spender: string,
  amount: string,
  user: string
) => {
  if (window.ethereum) {
    // Get connected accounts, if not connected request connnection.
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner(user);

    // The current selected account out of the connected accounts.

    let abi = ["function approve(address spender, uint256 amount)"];
    const CUSDContract = new Contract(CUSD_ADDRESS, abi, signer);
    let txn = await CUSDContract.approve(spender, parseEther(amount));
    let receipt = await txn.wait();
    console.log(receipt);
    return receipt;
  }
};

declare global {
  interface Window {
    ethereum: any;
  }
}
