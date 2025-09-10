import React from "react";
import { CheckCircle } from "lucide-react";
import { WhitelistStatus } from "./types";

interface WlShareCardProps {
  wallet: string;
  status: WhitelistStatus;
}

const WlShareCard: React.FC<WlShareCardProps> = ({ wallet, status }) => {
  if (status !== WhitelistStatus.GTD && status !== WhitelistStatus.FCFS) {
    return null;
  }

  const wlType = status === WhitelistStatus.GTD ? "GTD" : "FCFS";
  const message = `Wallet ${wallet} is whitelisted for Bastards ${wlType} PASS ✅`;
  const url = "https://bastards-checker.vercel.app/"; // <-- replace with your live app url
  const hashtags = "BastardsGTD,Whitelist";

  const twitterIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    message
  )}&url=${encodeURIComponent(url)}&hashtags=${hashtags}`;

  return (
    <div className="mt-6">
      <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg p-6 text-white text-center">
        <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-300" />
        <h2 className="text-xl font-semibold mb-2">You’re Whitelisted 🎉</h2>
        <p className="text-sm mb-4">
          Wallet <span className="font-mono">{wallet}</span> is on the{" "}
          <span className="font-bold">{wlType}</span> list.
        </p>
        <a
          href={twitterIntent}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-xl bg-white text-indigo-700 font-medium px-4 py-2 hover:bg-gray-100 transition"
        >
          Share on X
        </a>
      </div>
    </div>
  );
};

export default WlShareCard;
