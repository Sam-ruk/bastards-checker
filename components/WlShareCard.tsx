import React from "react";
import { WhitelistStatus } from "../types";

interface WlShareCardProps {
  wallet: string;
  status: WhitelistStatus;
}

const WlShareCard: React.FC<WlShareCardProps> = ({ wallet, status }) => {
  if (status !== WhitelistStatus.GTD && status !== WhitelistStatus.FCFS) {
    return null;
  }

  const wlType = status === WhitelistStatus.GTD ? "GTD" : "FCFS";
  const message = `Wallet ${wallet} is whitelisted for Bastards ${wlType} PASS 🎉`;
  const url = "https://bastards-checker.vercel.app/"; // should have OG tags
  const hashtags = "BastardsGTD,Whitelist";

  const twitterIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    message
  )}&url=${encodeURIComponent(url)}&hashtags=${hashtags}`;

  return (
    <div className="mt-6 animate-fade-in">
      <div className="rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl ring-1 ring-white/10 overflow-hidden">
        {/* Banner image full width */}
        <img
          src="https://i.ibb.co/C3CPhLLP/5es4aj.jpg"
          alt="Bastards Banner"
          className="w-full h-40 object-cover"
        />

        {/* Content */}
        <div className="p-6 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">You’re Whitelisted 🎉</h2>
          <p className="text-sm mb-4">
            Wallet <span className="font-mono">{wallet}</span> is on the{" "}
            <span className="font-bold">{wlType}</span> list.
          </p>

          <a
            href={twitterIntent}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-xl bg-indigo-600 text-white font-medium px-4 py-2 hover:bg-indigo-700 transition"
          >
            Share on X
          </a>
        </div>
      </div>

      {/* Fade-in animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default WlShareCard;
