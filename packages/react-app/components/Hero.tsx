import Image from "next/image";
import preview from "../public/img/preview.png";
import Stroke from "./icons/Stroke";
import { useAccount } from "wagmi";
import Link from "next/link";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const Hero = () => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  return (
    <section className="py-8 lg:py-8 px-4 lg:pt-10 lg:px-7 pb-16">
      <header className="flex flex-col gap-y-12 xl:max-w-[1080px] xl:mx-auto">
        <div className="flex flex-col space-y-6">
          <h1
            className="font-inter font-bold tracking-[-0.04em] leading-[1.2em] text-base-100 text-4xl text-center
          md:w-[70%] md:mx-auto lg:text-[56px]"
          >
            <span className="relative inline-block">
              Supercharge <Stroke />
            </span>{" "}
            positive habits, save for the rainy day
          </h1>

          <p
            className="text-lg font-medium leading-[1.75em] text-center 
          md:w-[70%] md:mx-auto lg:w-[60%] lg:text-2xl"
          >
            Earn interest on your cUSD by saving on the blockchain.
          </p>

          <div className="flex items-center justify-center">
            {isConnected ? (
              <Link
                href="/dashboard"
                className="bg-yellow font-bold text-base-100 px-5 py-3 rounded-lg lg:px-9"
              >
                Start saving →
              </Link>
            ) : (
              <button
                onClick={openConnectModal}
                className="bg-yellow font-bold text-base-100 px-5 py-3 rounded-lg lg:px-9"
              >
                Connect wallet →
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-[60%]">
            <Image src={preview} alt="Rainfy preview" />
          </div>
        </div>
      </header>
    </section>
  );
};
export default Hero;
