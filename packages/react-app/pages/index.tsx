import { useAccount } from "wagmi";
import Hero from "../components/Hero";

export default function Home() {
  const { address, isConnected } = useAccount();

  return (
    <div className="flex flex-col justify-center items-center">
      <Hero />
    </div>
  );
}
