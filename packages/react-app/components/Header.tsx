import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useNetwork } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import User from "./icons/User";
import ChevronDown from "./icons/ChevronDown";
import Menu from "./icons/menu";
import Logo from "./icons/Logo";

export default function Header() {
  const [hideConnectBtn, setHideConnectBtn] = useState(false);
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMiniPay) {
      setHideConnectBtn(true);
      connect();
    }
  }, [connect]);

  return (
    <nav className="hidden lg:flex justify-between w-full p-4 lg:p-6 2xl:px-24 text-base-100 font-bold border-b border-b-gray ">
      <Link href="/" className="flex items-center gap-x-1">
        <Logo />
        Lockie
      </Link>

      <Link
        href="/dashboard"
        className=" bg-yellow/80 font-bold text-base-100 px-4 py-2 rounded-lg md:hidden"
      >
        Start saving →
      </Link>

      <div className="hidden lg:flex items-center space-x-9 text-base-100 font-medium leading-[1.6em]">
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

        {openChainModal && (
          <button
            className="border border-gray rounded-md text-black p-2 flex"
            onClick={openChainModal}
            type="button"
          >
            {chain?.name} <ChevronDown />
          </button>
        )}

        <ConnectButton />
      </div>
    </nav>
  );
}

declare global {
  interface Window {
    ethereum: any;
  }
}
