
import React from 'react';

interface WalletInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const WalletInput: React.FC<WalletInputProps> = ({ value, onChange }) => {
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
