import Link from "next/link";
import { useAccount, useNetwork } from "wagmi";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import User from "./icons/User";
import ChevronDown from "./icons/ChevronDown";
import Logo from "./icons/Logo";

export default function Header() {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { chain } = useNetwork();
  const { address } = useAccount();

  return (
    <nav className="hidden lg:flex justify-between w-full p-4 lg:px-16 lg:py-6 2xl:px-24 text-base-100 font-bold border-b border-b-gray ">
      <Link href="/" className="flex items-center gap-x-1">
        <Logo />
        Givvie
      </Link>

      <div className="flex items-center space-x-9 text-base-100 font-medium leading-[1.6em]">
        {openConnectModal && (
          <button
            onClick={openConnectModal}
            className="bg-yellow font-bold text-base-100 px-4 py-2 rounded-lg"
          >
            Connect wallet
          </button>
        )}

        {openAccountModal && (
          <>
            <Link href="/dashboard"> Dashboard </Link>

            <button
              onClick={openAccountModal}
              className="flex items-center justify-center cursor-pointer"
            >
              {/* @ts-ignore */}
              {address.substring(0, 5)}
              <User />
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

declare global {
  interface Window {
    ethereum: any;
  }
}
