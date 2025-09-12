import React, { useState, useCallback } from 'react';
import { GTD_WHITELIST, FCFS_WHITELIST } from './constants';
import { WhitelistStatus } from './types';
import WlShareCard from "./components/WlShareCard";

// --- Component from components/WalletInput.tsx ---
interface WalletInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const WalletInput: React.FC<WalletInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="wallet-address" className="sr-only">
        Wallet Address
      </label>
      <input
        id="wallet-address"
        name="wallet-address"
        type="text"
        autoComplete="off"
        required
        className="w-full px-4 py-3 bg-white/10 rounded-lg border border-transparent focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-white placeholder-gray-400 transition-all duration-300 ease-in-out outline-none"
        placeholder="0x..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

// --- Component from components/CheckButton.tsx ---
interface CheckButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
}

const CheckButton: React.FC<CheckButtonProps> = ({ onClick, isLoading, disabled }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-indigo-500 disabled:bg-indigo-500/50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 disabled:scale-100"
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Checking...
        </>
      ) : (
        'Check Wallet'
      )}
    </button>
  );
};

// --- Component from components/ResultDisplay.tsx ---
interface ResultDisplayProps {
  status: WhitelistStatus;
}

interface StatusDetails {
  message: string;
  className: string;
}

const statusMap: Record<WhitelistStatus, StatusDetails | null> = {
  [WhitelistStatus.IDLE]: null,
  [WhitelistStatus.GTD]: {
    message: '✅ Welcome, Bastard. You are on the GTD list.',
    className: 'text-green-400',
  },
  [WhitelistStatus.FCFS]: {
    message: '⚡ Wallet is on the FCFS list.',
    className: 'text-blue-400',
  },
  [WhitelistStatus.NOT_FOUND]: {
    message: '❌ Your wallet is not on the GTD list.',
    className: 'text-red-400',
  },
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ status }) => {
  const details = statusMap[status];

  if (!details) {
    return null;
  }

  return (
    <div 
      key={status} // Use key to re-trigger animation on status change
      className={`animate-fade-in text-lg font-medium ${details.className}`}
      style={{ animation: 'fadeIn 0.5s ease-in-out' }}
    >
      {details.message}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation-name: fadeIn;
          animation-duration: 0.5s;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
};

// --- Main App Component ---
const App: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [status, setStatus] = useState<WhitelistStatus>(WhitelistStatus.IDLE);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCheckWallet = useCallback(() => {
    if (!walletAddress.trim()) {
      setStatus(WhitelistStatus.IDLE);
      return;
    }

    setIsLoading(true);
    setStatus(WhitelistStatus.IDLE);

    // Simulate a network delay for better UX
    setTimeout(() => {
      const trimmedAddress = walletAddress.trim();

      const isGtd = GTD_WHITELIST.some(
        (addr) => addr.toLowerCase() === trimmedAddress.toLowerCase()
      );
      if (isGtd) {
        setStatus(WhitelistStatus.GTD);
        setIsLoading(false);
        return;
      }

      const isFcfs = FCFS_WHITELIST.some(
        (addr) => addr.toLowerCase() === trimmedAddress.toLowerCase()
      );
      if (isFcfs) {
        setStatus(WhitelistStatus.FCFS);
        setIsLoading(false);
        return;
      }

      setStatus(WhitelistStatus.NOT_FOUND);
      setIsLoading(false);
    }, 500);
  }, [walletAddress]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(e.target.value);
    if (status !== WhitelistStatus.IDLE) {
      setStatus(WhitelistStatus.IDLE);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col items-center p-4 overflow-y-auto pb-20">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      <div className="relative z-10 text-center max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl pt-20">
          Bastards GTD PASS Checker
        </h1>
        <p className="mt-4 text-lg leading-8 text-indigo-200">
          Are you ready, Bastards? 
          Check if your wallet made it to the whitelist for the GTD Pass minting event.
        </p>
        <p className="mt-6 text-base leading-7 text-gray-300">
          The Bastards community is where passion meets opportunity. Whether you’re here for art, culture, or the grind, your GTD Pass is the key to joining an exclusive network built on creativity, trust, and collaboration.
        </p>
        <p className="mt-4 text-lg italic text-indigo-300">
          “Not just a mint, a movement.”
        </p>
        <p className="mt-6 text-base leading-7 text-gray-300">
          If you're a Beast (GTD Mainnet role) in Bastards DC, you're not eligible for the GTD Pass. The GTD Pass is exclusive to our supporters on X.
        </p>
      </div>

      <div className="relative z-10 my-8 w-full max-w-lg">
        <img
          src="https://i.ibb.co/C3CPhLLP/5es4aj.jpg"
          alt="The Bastards Community Artwork"
          className="rounded-lg shadow-2xl w-full h-auto object-cover ring-1 ring-white/10"
        />
      </div>

      <div className="w-full flex justify-center">
        <main className="relative z-10 w-full max-w-lg">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl ring-1 ring-white/10 p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Check your GTD PASS Status</h2>
            <p className="mb-6 text-indigo-200">
              Enter your wallet address to check your status.
            </p>

            <div className="space-y-6">
              <WalletInput 
                value={walletAddress}
                onChange={handleInputChange}
              />
              <CheckButton 
                onClick={handleCheckWallet} 
                isLoading={isLoading} 
                disabled={!walletAddress.trim()} 
              />
              <div className="h-8 mt-4">
                <ResultDisplay status={status} />
              </div>
              <WlShareCard wallet={walletAddress} status={status} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;