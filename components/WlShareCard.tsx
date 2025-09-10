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
  const message = `I'm whitelisted for Bastards ${wlType} PASS 🎉`;
  const url = "https://bastards-checker.vercel.app/"; // OG tags will handle banner
  const hashtags = "BastardsGTD,Whitelist";

  const twitterIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    message
  )}&url=${encodeURIComponent(url)}&hashtags=${hashtags}`;

  return (
    <div className="mt-6 animate-fade-in text-center">
      <a
        href={twitterIntent}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-xl bg-indigo-600 text-white font-medium px-6 py-3 hover:bg-indigo-700 transition"
      >
        Share on X
      </a>

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
