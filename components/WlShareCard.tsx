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
  const message = `Wallet ${wallet} is whitelisted for Bastards ${wlType} PASS ✅`;
  const url = "https://bastards-checker.vercel.app/"; // your live app url
  const hashtags = "BastardsGTD,Whitelist";

  const twitterIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    message
  )}&url=${encodeURIComponent(url)}&hashtags=${hashtags}`;

  return (
    <div className="mt-6 animate-fade-in">
      <div className="rounded-2xl bg-white/10 backdrop-blur-xl shadow-xl ring-1 ring-white/10 p-6 text-white text-center">
        {/* Your artwork image */}
        <img
          src="https://i.ibb.co/C3CPhLLP/5es4aj.jpg"
          alt="Bastards Artwork"
          className="w-20 h-20 mx-auto mb-4 rounded-full ring-2 ring-indigo-400 object-cover"
        />

        <h2 className="text-xl font-semibold mb-2">You’re Whitelisted 🎉</h2>
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

      {/* Small fade-in animation */}
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
