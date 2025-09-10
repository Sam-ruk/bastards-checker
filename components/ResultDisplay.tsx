
import React from 'react';
import { WhitelistStatus } from '../types';

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
    message: '✅ Wallet is Whitelisted (GTD)',
    className: 'text-green-400',
  },
  [WhitelistStatus.FCFS]: {
    message: '⚡ Wallet is Whitelisted (FCFS)',
    className: 'text-blue-400',
  },
  [WhitelistStatus.NOT_FOUND]: {
    message: '❌ Wallet is not Whitelisted',
    className: 'text-red-400',
  },
};

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ status }) => {
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
